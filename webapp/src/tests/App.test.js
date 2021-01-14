import { render, screen } from '@testing-library/react';

import NavBar from '../components/NavBar';
import AllGradesContainer from '../components/Grades/AllGradesContainer';
import CourseAssignScores from '../components/Grades/CourseAssignScores';
import Login from '../components/Authentication/Login';
import Register from '../components/Authentication/Register';
import ProfileContainer from '../components/Profile/ProfileContainer';
import UpdateProfile from '../components/Profile/UpdateProfile';
import UpdatePassword from '../components/Profile/UpdatePassword';

// Get mock data for API simulation
import configureMockStore from "redux-mock-store";
import { Provider } from "react-redux";
const mockStore = configureMockStore();
const store = mockStore({});

import { shallow } from 'enzyme';
import { configure } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';
import { updateUser } from '../store/actions/user.action';
configure({ adapter: new Adapter() });

// Renders NavBar Component
describe('Testing <NavBar /> Component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <NavBar />
    </Provider>)
  it('renders', () => {
    expect(wrapper.length).toBe(1);
  });
})

// Renders AllGradesContainer Component
describe('Testing <AllGradesContainer /> Component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <AllGradesContainer />
    </Provider>)
  it('renders', () => {
    expect(wrapper.length).toBe(1);
  });
})

// Renders CourseAssignScores Component
describe('Testing <CourseAssignScores /> Component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <CourseAssignScores />
    </Provider>)
  it('renders', () => {
    expect(wrapper.length).toBe(1);
  });
})

// Renders Login Component
describe('Testing <Login /> Component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Login />
    </Provider>)
  it('renders', () => {
    expect(wrapper.length).toBe(1);
  });
})

// Renders Register Component
describe('Testing <Register /> Component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <Register />
    </Provider>)
  it('renders', () => {
    expect(wrapper.length).toBe(1);
  });
})

// Renders Profile Container Component
describe('Testing <ProfileContainer /> Component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <ProfileContainer />
    </Provider>)
  it('renders', () => {
    expect(wrapper.length).toBe(1);
  });
})

// Renders UpdatePassword Component
describe('Testing <UpdatePassword /> Component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <UpdatePassword />
    </Provider>)
  it('renders', () => {
    expect(wrapper.length).toBe(1);
  });
})

// Renders UpdateProfile Component
describe('Testing <ProfileContainer /> Component', () => {
  const wrapper = shallow(
    <Provider store={store}>
      <UpdateProfile />
    </Provider>)
  it('renders', () => {
    expect(wrapper.length).toBe(1);
  });
})