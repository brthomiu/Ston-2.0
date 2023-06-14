import { render, screen } from "@testing-library/react"

import App from "./App"

describe("App", () => {
  it("should render app", () => {
    render(<App />)
    expect(screen.getByText(/Test/i)).toBeInTheDocument()
  })
})
