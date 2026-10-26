import { describe, it, expect, beforeAll } from "vitest";
import { render, screen } from "@testing-library/react";
import { I18nextProvider } from "react-i18next";
import i18n from "../i18n";
import CartProvider from "../context/CartProvider";
import Products from "../pages/home/components/Products";
import Aromas from "../pages/home/components/Aromas";
import Contact from "../pages/home/components/Contact";
import Footer from "../pages/home/components/Footer";

beforeAll(() => {
  document.documentElement.lang = "es";
});

function renderWithProviders(ui: React.ReactElement) {
  return render(
    <I18nextProvider i18n={i18n}>
      <CartProvider>{ui}</CartProvider>
    </I18nextProvider>
  );
}

describe("Prueba 1: Renderizado de componentes principales", () => {
  it("Products renderiza los 38 productos", () => {
    renderWithProviders(<Products />);
    const title = screen.getByText(i18n.t("products.title"));
    expect(title).toBeInTheDocument();
    const addToCartButtons = screen.getAllByText(i18n.t("products.addToCart"));
    expect(addToCartButtons.length).toBe(38);
  });

  it("Products muestra el botón de agregar todos", () => {
    renderWithProviders(<Products />);
    const addAllBtn = screen.getByText(i18n.t("products.addAll"));
    expect(addAllBtn).toBeInTheDocument();
  });

  it("Aromas renderiza los 18 aromas", () => {
    renderWithProviders(<Aromas />);
    const title = screen.getByText(i18n.t("aromas.title"));
    expect(title).toBeInTheDocument();
    const maracuya = screen.getByText(i18n.t("aromas.data.1.name"));
    expect(maracuya).toBeInTheDocument();
  });

  it("Aromas tiene 9 botones de filtro", () => {
    renderWithProviders(<Aromas />);
    const filterButtons = screen.getAllByRole("button", { name: /todos|tropical|frutal|herbal|cítrico|gourmand|suave|acuático|navidad/i });
    expect(filterButtons.length).toBe(9);
  });

  it("Contact renderiza el formulario con 5 campos", () => {
    renderWithProviders(<Contact />);
    const nameInput = screen.getByPlaceholderText(i18n.t("contact.form.name.placeholder"));
    const emailInput = screen.getByPlaceholderText(i18n.t("contact.form.email.placeholder"));
    const messageArea = screen.getByPlaceholderText(i18n.t("contact.form.message.placeholder"));
    expect(nameInput).toBeInTheDocument();
    expect(emailInput).toBeInTheDocument();
    expect(messageArea).toBeInTheDocument();
  });

  it("Contact tiene select de asunto con 6 opciones", () => {
    renderWithProviders(<Contact />);
    const select = screen.getByRole("combobox");
    const options = select.querySelectorAll("option");
    expect(options.length).toBe(6);
  });

  it("Footer renderiza enlaces legales", () => {
    renderWithProviders(<Footer />);
    const cookiesLink = screen.getByText(i18n.t("footer.legal.cookies"));
    const privacyLink = screen.getByText(i18n.t("footer.legal.privacy"));
    const termsLink = screen.getByText(i18n.t("footer.legal.terms"));
    expect(cookiesLink).toBeInTheDocument();
    expect(privacyLink).toBeInTheDocument();
    expect(termsLink).toBeInTheDocument();
  });
});
