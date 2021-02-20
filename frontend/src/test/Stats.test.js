import Stats from "../../src/utility/Stats";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

const _exercises = [
  {
    id: 1,
    exercise: "",
    set: 1,
    weight: 25,
    reps: 2,
    pr: false,
    notes: "",
  },
  {
    id: 2,
    exercise: "",
    set: 2,
    weight: 10,
    reps: 5,
    pr: false,
    notes: "",
  },
  {
    id: 3,
    exercise: "",
    set: 3,
    weight: 50,
    reps: 1,
    pr: false,
    notes: "",
  },
];

describe("Stats calculations", () => {
  it("prints total to body", () => {
    const wrapper = mount(<Stats exercises={_exercises} format="kg" />);

    expect(wrapper.contains("150")).toEqual(true);
    expect(wrapper.contains("kg")).toEqual(true);
  });
});
