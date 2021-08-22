import Head from 'next/head'
import Icon from '../components/atoms/Icon';
import Button, { types as buttonTypes } from '../components/atoms/Button';
import Tab from '../components/atoms/Tab';
import MainNav from '../components/molecules/MainNav';
import AuthNav from '../components/molecules/AuthNav';
import ActionButton from '../components/atoms/ActionButton';
import Interval from '../components/atoms/Interval';
import Timeline from '../components/molecules/TImeline';
import Arrow, { types as arrowTypes } from '../components/atoms/Arrow';
import Label, {types as labelTypes, types } from '../components/atoms/Label';
import TextInput from '../components/atoms/TextInput';

const intervals = [
  { type: 'work' },
  { type: 'break' },
  { type: 'blocked' },
  { type: 'blocked' },
  { type: 'floating' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'work' },
  { type: 'break' },
  { type: 'blocked' },
  { type: 'blocked' },
  { type: 'floating' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'work' },
  { type: 'break' },
  { type: 'blocked' },
  { type: 'blocked' },
  { type: 'floating' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
  { type: 'work' },
  { type: 'break' },
  { type: 'blocked' },
  { type: 'blocked' },
  { type: 'floating' },
  { type: 'work' },
  { type: 'break' },
  { type: 'work' },
];

const hours = ['12:00', '13:00', '14:00', '15:00', '16:00', '17:00', '18:00', '19:00', '20:00']

export default function Home() {
  return (
    <div>
      <Head>
        <title>Create Next App</title>
        <meta name="description" content="Generated by create next app" />
      </Head>

      <div className='m-24'>
        <TextInput
          bigLabel="Big Label"
          smallLabel="Small Label"
          successLabel="Password Strength: Excellent"
          errorLabel="Passwords don't match!"
        >
          Enter your password
        </TextInput>
      </div>
    </div>
  )
}
