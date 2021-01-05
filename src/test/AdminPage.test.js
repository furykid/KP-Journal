import AdminPage from "../../src/components/AdminPage";
import { configure, shallow } from "enzyme";
import Adapter from "@wojtekmaj/enzyme-adapter-react-17";
configure({ adapter: new Adapter() });

it("renders without crashing", () => {
  shallow(<AdminPage />);
});

it("renders headings", () => {
  const wrapper = shallow(<AdminPage />);
  const heading = <h1>Admin Page</h1>;
  const usersHeading = <h2>Users</h2>;
  expect(wrapper.contains(heading)).toEqual(true);
  expect(wrapper.contains(usersHeading)).toEqual(true);
});
