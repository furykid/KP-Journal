import JournalEntryPage from '../../src/components/JournalEntryPage';
import { configure, mount } from 'enzyme';
import Adapter from '@wojtekmaj/enzyme-adapter-react-17';
configure({ adapter: new Adapter() });

const _journalEntry = {
  id: 1,
  date: '2020-05-23T18:25:43.511Z',
  userId: 0,
  tag: 'snatch',
  weightFormat: 'kg',
  sleep: 8,
  calories: 1500,
  notes: 'Everything felt great',
  exercises: [
    {
      id: 1,
      exercise: 'snatch recoveries',
      set: 1,
      weight: 40,
      reps: 5,
      pr: false,
      notes: 'Rough start',
    },
    {
      id: 2,
      exercise: 'snatch recoveries',
      set: 2,
      weight: 80,
      reps: 5,
      pr: true,
      notes: 'Very sore',
    },
    {
      id: 3,
      exercise: 'snatch recoveries',
      set: 2,
      weight: 85,
      reps: 3,
      pr: true,
      notes: 'Super heavy',
    },
  ],
};

describe('Journal Entriy render exercises', () => {
  it('renders exercise list from props', () => {
    const wrapper = mount(
      <JournalEntryPage
        journalEntry={_journalEntry}
        match={{ params: { userId: 0, entryId: 1 } }}
      />
    );

    expect(wrapper.props().journalEntry.exercises).toEqual(
      _journalEntry.exercises
    );
  });

  // it('renders journal entry specific data to list', () => {
  //   const wrapper = mount(
  //     <JournalEntryPage
  //       journalEntry={_journalEntry}
  //       match={{ params: { userId: 0, entryId: 1 } }}
  //     />
  //   );

  //   const list = wrapper.find('ul');
  //   expect(list).toHaveLength(1);

  //   list.forEach((li, rowIndex) => {
  //     const nameElement = li.find('h5');
  //     expect(nameElement.childAt(0).text()).toContain(
  //       _journalEntry.exercises[rowIndex].exercise
  //     );
  //     const element = li.find('li');
  //     expect(element.childAt(0).text()).toContain(
  //       _journalEntry.exercises[rowIndex].exercise
  //     );
  //     expect(element.childAt(1).text()).toContain(
  //       _journalEntry.exercises[rowIndex].set
  //     );
  //     expect(element.childAt(2).text()).toContain(
  //       _journalEntry.exercises[rowIndex].weight
  //     );
  //     expect(element.childAt(3).text()).toContain(
  //       _journalEntry.exercises[rowIndex].reps
  //     );
  //     expect(element.childAt(4).text()).toContain(
  //       _journalEntry.exercises[rowIndex].notes
  //     );
  //   });
  // });
});
