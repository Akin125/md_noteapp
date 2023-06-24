import {render, fireEvent, screen} from "@testing-library/react";

import Editor from "../components/Editor";

describe("Editor", () => {
    it("Render the Editor component", function () {
        //renders to the virtual DOM
        render(<Editor/>);
    })
});