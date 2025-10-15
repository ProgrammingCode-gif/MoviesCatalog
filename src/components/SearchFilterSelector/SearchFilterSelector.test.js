import { render } from "@testing-library/react"
import SearchFilterSelector from "./SearchFilterSelector"

describe(SearchFilterSelector, () => {
    it("filter changed", () => {
        const { getAllByTestId } = render(<SearchFilterSelector options={[{id: 1, name: "fantasy"}]}/>)
        const button = getAllByTestId("button")
        expect(button[0].innerText).toBe("Не выбрано")
    })
})