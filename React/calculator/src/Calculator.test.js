/*
Resources:
https://blog.bitsrc.io/how-to-test-react-components-using-jest-and-enzyme-fab851a43875
*/

import React from "react";
import Enzyme, { shallow, mount } from "enzyme";
import Calculator from "./components/calculator.jsx";
import Adapter from "enzyme-adapter-react-16";

Enzyme.configure({ adapter: new Adapter() });

describe("Calculator component", () => {
  test("renders", () => {
    const wrapper = shallow(<Calculator />);
    expect(wrapper.exists()).toBe(true);
  });
});
