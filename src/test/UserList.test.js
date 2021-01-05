import UserList from "../../src/components/UserList";
import { configure, mount } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
import { BrowserRouter as Router } from "react-router-dom";
configure({ adapter: new Adapter() });

const _users = [
  {
    userName: "Nick",
    email: "furykid777@gmail.com",
    password: "password",
    accountType: "admin",
    id: 0,
    weight: 169,
    height: "5' 5\"",
    userSince: "2010-05-23T18:25:43.511Z",
  },
  {
    userName: "Test User",
    email: "test@email.com",
    password: "abc123",
    accountType: "free",
    id: 1,
    weight: 159,
    height: "5' 5\"",
    userSince: "2019-05-23T18:25:43.511Z",
  },
];

describe("User list render tests", () => {
  it("renders user list from props", () => {
    const wrapper = mount(
      <Router>
        <UserList users={_users} />
      </Router>
    );

    expect(wrapper.props().children.props.users).toEqual(_users);
  });

  it("renders user specific data to list", () => {
    const wrapper = mount(
      <Router>
        <UserList users={_users} />
      </Router>
    );

    // There should be ONLY 1 table element
    const table = wrapper.find("table");
    expect(table).toHaveLength(1);

    // The table should have ONLY 1 thead element
    const thead = table.find("thead");
    expect(thead).toHaveLength(1);

    // The table should have ONLY 1 tbody tag
    const tbody = table.find("tbody");
    expect(tbody).toHaveLength(1);

    const rows = tbody.find("tr");
    expect(rows).toHaveLength(_users.length);

    rows.forEach((tr, rowIndex) => {
      const cells = tr.find("td");
      expect(cells).toHaveLength(4); // 4 columns
      expect(~~cells.at(0).text()).toEqual(_users[rowIndex].id);
      expect(cells.at(1).text()).toEqual(_users[rowIndex].userName);
      expect(cells.at(2).text()).toEqual(_users[rowIndex].accountType);
      expect(cells.at(3).text()).toEqual(
        new Date(_users[rowIndex].userSince).toDateString()
      );
    });
  });
});
