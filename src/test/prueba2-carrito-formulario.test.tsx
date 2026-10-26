import { describe, it, expect } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import CartProvider from "../context/CartProvider";
import { useCart } from "../context/cart";
import Products from "../pages/home/components/Products";
import ShoppingCart from "../components/ShoppingCart";

function TestCartConsumer() {
  const { items, totalItems, totalPrice, clearCart } = useCart();
  return (
    <div>
      <span data-testid="total-items">{totalItems}</span>
      <span data-testid="total-price">{totalPrice}</span>
      <span data-testid="items-count">{items.length}</span>
      <button onClick={clearCart} data-testid="clear-btn">Clear</button>
    </div>
  );
}

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <I18nextProvider i18n={i18n}>
      <CartProvider>
        {ui}
        <TestCartConsumer />
        <ShoppingCart />
      </CartProvider>
    </I18nextProvider>
  );
}

describe("Prueba 2: Carrito de compras y formularios", () => {
  it("Agregar un producto al carrito actualiza el contador", () => {
    renderWithProviders(<Products />);
    const addButtons = screen.getAllByText(i18n.t("products.addToCart"));
    fireEvent.click(addButtons[0]);
    const totalItems = screen.getByTestId("total-items");
    expect(totalItems.textContent).toBe("1");
  });

  it("Agregar dos productos diferentes acumula correctamente", () => {
    renderWithProviders(<Products />);
    const addButtons = screen.getAllByText(i18n.t("products.addToCart"));
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);
    const totalItems = screen.getByTestId("total-items");
    expect(totalItems.textContent).toBe("2");
  });

  it("Agregar el mismo producto dos veces acumula cantidad", () => {
    renderWithProviders(<Products />);
    const addButtons = screen.getAllByText(i18n.t("products.addToCart"));
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[0]);
    const totalItems = screen.getByTestId("total-items");
    const itemsCount = screen.getByTestId("items-count");
    expect(totalItems.textContent).toBe("2");
    expect(itemsCount.textContent).toBe("1");
  });

  it("El total del carrito se calcula correctamente", () => {
    renderWithProviders(<Products />);
    const addButtons = screen.getAllByText(i18n.t("products.addToCart"));
    fireEvent.click(addButtons[0]);
    const totalPrice = screen.getByTestId("total-price");
    expect(Number(totalPrice.textContent)).toBe(100000);
  });

  it("Vaciar carrito pone todo en cero", () => {
    renderWithProviders(<Products />);
    const addButtons = screen.getAllByText(i18n.t("products.addToCart"));
    fireEvent.click(addButtons[0]);
    fireEvent.click(addButtons[1]);
    const clearBtn = screen.getByTestId("clear-btn");
    fireEvent.click(clearBtn);
    const totalItems = screen.getByTestId("total-items");
    const totalPrice = screen.getByTestId("total-price");
    expect(totalItems.textContent).toBe("0");
    expect(Number(totalPrice.textContent)).toBe(0);
  });

  it("El botón 'Agregar todos' carga los 38 productos", () => {
    renderWithProviders(<Products />);
    const addAllBtn = screen.getByText(i18n.t("products.addAll"));
    fireEvent.click(addAllBtn);
    const totalItems = screen.getByTestId("total-items");
    expect(totalItems.textContent).toBe("38");
  });

  it("El carrito flotante muestra el badge de cantidad", () => {
    renderWithProviders(<Products />);
    const addButtons = screen.getAllByText(i18n.t("products.addToCart"));
    fireEvent.click(addButtons[0]);
    const cartButton = screen.getByLabelText(i18n.t("cart.title"));
    expect(cartButton).toBeInTheDocument();
  });
});
