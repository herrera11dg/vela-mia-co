from flask import Flask, request, jsonify
from flask_cors import CORS
import bcrypt
from db import get_connection

app = Flask(__name__)
CORS(app)


# ===================== PRODUCTOS =====================

@app.route("/api/productos", methods=["GET"])
def listar_productos():
    conn = get_connection()
    if not conn:
        return jsonify({"error": "Error de conexion a la base de datos"}), 500
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT id, nombre, precio, imagen, categoria, descripcion, stock FROM productos ORDER BY id")
    productos = cursor.fetchall()
    cursor.close()
    conn.close()
    return jsonify(productos), 200


@app.route("/api/productos/<int:producto_id>", methods=["GET"])
def obtener_producto(producto_id):
    conn = get_connection()
    if not conn:
        return jsonify({"error": "Error de conexion a la base de datos"}), 500
    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM productos WHERE id = %s", (producto_id,))
    producto = cursor.fetchone()
    cursor.close()
    conn.close()
    if not producto:
        return jsonify({"error": "Producto no encontrado"}), 404
    return jsonify(producto), 200


# ===================== USUARIOS (CON BCRYPT) =====================

@app.route("/api/registro", methods=["POST"])
def registrar_usuario():
    data = request.get_json()

    documento = data.get("documento_identidad")
    nombres = data.get("nombres")
    apellidos = data.get("apellidos")
    correo = data.get("correo")
    telefono = data.get("telefono", "")
    contrasena = data.get("contrasena")

    if not all([documento, nombres, apellidos, correo, contrasena]):
        return jsonify({"error": "Faltan campos obligatorios"}), 400

    if len(contrasena) < 6:
        return jsonify({"error": "La contrasena debe tener al menos 6 caracteres"}), 400

    contrasena_hash = bcrypt.hashpw(contrasena.encode("utf-8"), bcrypt.gensalt()).decode("utf-8")

    conn = get_connection()
    if not conn:
        return jsonify({"error": "Error de conexion a la base de datos"}), 500

    cursor = conn.cursor()
    try:
        cursor.execute(
            "INSERT INTO usuarios (documento_identidad, nombres, apellidos, correo, telefono, contrasena) VALUES (%s, %s, %s, %s, %s, %s)",
            (documento, nombres, apellidos, correo, telefono, contrasena_hash),
        )
        conn.commit()
        return jsonify({"mensaje": "Usuario registrado correctamente"}), 201
    except Exception as e:
        conn.rollback()
        if "Duplicate entry" in str(e):
            return jsonify({"error": "El correo o documento ya esta registrado"}), 409
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()


@app.route("/api/login", methods=["POST"])
def iniciar_sesion():
    data = request.get_json()
    correo = data.get("correo")
    contrasena = data.get("contrasena")

    if not correo or not contrasena:
        return jsonify({"error": "Correo y contrasena son obligatorios"}), 400

    conn = get_connection()
    if not conn:
        return jsonify({"error": "Error de conexion a la base de datos"}), 500

    cursor = conn.cursor(dictionary=True)
    cursor.execute("SELECT * FROM usuarios WHERE correo = %s", (correo,))
    usuario = cursor.fetchone()
    cursor.close()
    conn.close()

    if not usuario:
        return jsonify({"error": "Credenciales invalidas"}), 401

    if bcrypt.checkpw(contrasena.encode("utf-8"), usuario["contrasena"].encode("utf-8")):
        return jsonify({
            "mensaje": "Inicio de sesion exitoso",
            "usuario": {
                "documento": usuario["documento_identidad"],
                "nombres": usuario["nombres"],
                "apellidos": usuario["apellidos"],
                "correo": usuario["correo"],
            },
        }), 200
    else:
        return jsonify({"error": "Credenciales invalidas"}), 401


# ===================== CONTACTO =====================

@app.route("/api/contacto", methods=["POST"])
def guardar_contacto():
    data = request.get_json()
    nombre = data.get("nombre")
    email = data.get("email")
    asunto = data.get("asunto", "")
    mensaje = data.get("mensaje")

    if not all([nombre, email, mensaje]):
        return jsonify({"error": "Nombre, email y mensaje son obligatorios"}), 400

    conn = get_connection()
    if not conn:
        return jsonify({"error": "Error de conexion a la base de datos"}), 500

    cursor = conn.cursor()
    cursor.execute(
        "INSERT INTO contacto (nombre, email, asunto, mensaje) VALUES (%s, %s, %s, %s)",
        (nombre, email, asunto, mensaje),
    )
    conn.commit()
    cursor.close()
    conn.close()
    return jsonify({"mensaje": "Mensaje guardado correctamente"}), 201


# ===================== PEDIDOS =====================

@app.route("/api/pedidos", methods=["POST"])
def crear_pedido():
    data = request.get_json()
    usuario_documento = data.get("usuario_documento")
    items = data.get("items")

    if not usuario_documento or not items:
        return jsonify({"error": "Faltan datos del pedido"}), 400

    conn = get_connection()
    if not conn:
        return jsonify({"error": "Error de conexion a la base de datos"}), 500

    cursor = conn.cursor()
    try:
        total = sum(item["cantidad"] * item["precio_unitario"] for item in items)
        cursor.execute(
            "INSERT INTO pedidos (usuario_documento, total, estado) VALUES (%s, %s, %s)",
            (usuario_documento, total, "pendiente"),
        )
        pedido_id = cursor.lastrowid

        for item in items:
            cursor.execute(
                "INSERT INTO pedido_detalle (pedido_id, producto_id, cantidad, precio_unitario) VALUES (%s, %s, %s, %s)",
                (pedido_id, item["producto_id"], item["cantidad"], item["precio_unitario"]),
            )

        conn.commit()
        return jsonify({"mensaje": "Pedido creado", "pedido_id": pedido_id, "total": total}), 201
    except Exception as e:
        conn.rollback()
        return jsonify({"error": str(e)}), 500
    finally:
        cursor.close()
        conn.close()


# ===================== SALUD =====================

@app.route("/api/salud", methods=["GET"])
def salud():
    return jsonify({"estado": "ok", "mensaje": "API Vela Mia funcionando"}), 200


if __name__ == "__main__":
    app.run(debug=True, port=5000)
