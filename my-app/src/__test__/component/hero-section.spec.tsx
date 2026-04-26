import { render, screen } from "@testing-library/react"
import HeroSection from "@/views/produk/sections/HeroSection"

describe("HeroSection Component", () => {
  it("renders hero title correctly", () => {
    const component = render(<HeroSection />)

    expect(screen.getByTestId("hero-title").textContent).toBe("Halaman Produk")
    expect(component).toMatchSnapshot()
  })
})
