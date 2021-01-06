import JournalEntriesList from "../../src/components/JournalEntriesList";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { BrowserRouter as Router } from "react-router-dom";
configure({ adapter: new Adapter() });

const _journalEntries = [
  {
    id: 1,
    date: "2020-05-23T18:25:43.511Z",
    userId: 0,
    tag: "snatch",
    weightFormat: "kg",
    sleep: 8,
    calories: 1500,
    notes: "Everything felt great",
    exercises: [
      {
        id: 1,
        exercise: "snatch recoveries",
        set: 1,
        weight: 80,
        reps: 1,
        pr: true,
        notes: "Shoulders were a little sore",
      },
    ],
  },
  {
    id: 2,
    date: "2020-05-23T18:25:43.511Z",
    userId: 1,
    tag: "clean",
    weightFormat: "kg",
    sleep: 8,
    calories: 1500,
    notes: "Everything felt great",
    exercises: [
      {
        id: 1,
        exercise: "snatch recoveries",
        set: 1,
        weight: 40,
        reps: 5,
        pr: false,
        notes: "Shoulders were a little sore",
      },
    ],
  },
];

describe("Journal Entries render tests", () => {
  it("renders journal entries list from props", () => {
    const wrapper = mount(
      <Router>
        <JournalEntriesList journalEntries={_journalEntries} />
      </Router>
    );

    expect(wrapper.props().children.props.journalEntries).toEqual(
      _journalEntries
    );
  });

  it("renders journal entry specific data to list", () => {
    const wrapper = mount(
      <Router>
        <JournalEntriesList journalEntries={_journalEntries} />
      </Router>
    );

    const list = wrapper.find("ul");
    expect(list).toHaveLength(_journalEntries.length);

    list.forEach((li, rowIndex) => {
      const element = li.find("a");
      expect(element.childAt(0).text()).toContain(
        new Date(_journalEntries[rowIndex].date).toDateString()
      );
      expect(element.childAt(1).text()).toContain(
        _journalEntries[rowIndex].tag
      );
      expect(element.childAt(2).text()).toContain(
        _journalEntries[rowIndex].calories
      );
      expect(element.childAt(3).text()).toContain(
        _journalEntries[rowIndex].sleep
      );
      expect(element.childAt(4).text()).toContain(
        _journalEntries[rowIndex].notes
      );
    });
  });
});
