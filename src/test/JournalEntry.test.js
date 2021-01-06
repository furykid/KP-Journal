import JournalEntry from "../../src/components/JournalEntry";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

const _exercises = [
  {
    id: 1,
    exercise: "snatch recoveries",
    set: 1,
    weight: 40,
    reps: 5,
    pr: false,
    notes: "Rough start",
  },
  {
    id: 2,
    exercise: "snatch recoveries",
    set: 2,
    weight: 80,
    reps: 5,
    pr: true,
    notes: "Very sore",
  },
  {
    id: 3,
    exercise: "snatch recoveries",
    set: 2,
    weight: 85,
    reps: 3,
    pr: true,
    notes: "Super heavy",
  },
];

describe("Journal Entriy render exercises", () => {
  it("renders exercise list from props", () => {
    const wrapper = mount(<JournalEntry exercises={_exercises} />);

    expect(wrapper.prop("exercises")).toEqual(_exercises);
  });

  it("renders journal entry specific data to list", () => {
    const wrapper = mount(<JournalEntry exercises={_exercises} />);

    const list = wrapper.find("ul");
    expect(list).toHaveLength(_exercises.length);

    list.forEach((li, rowIndex) => {
      const element = li.find("li");
      expect(element.childAt(0).text()).toContain(
        _exercises[rowIndex].exercise
      );
      expect(element.childAt(1).text()).toContain(_exercises[rowIndex].set);
      expect(element.childAt(2).text()).toContain(_exercises[rowIndex].weight);
      expect(element.childAt(3).text()).toContain(_exercises[rowIndex].reps);
      expect(element.childAt(4).text()).toContain(_exercises[rowIndex].notes);
    });
  });
});
