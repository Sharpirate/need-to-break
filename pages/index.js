import Head from 'next/head'
import Icon from '../components/atoms/Icon';
import Button, { buttonTypes } from '../components/atoms/Button';
import Tab from '../components/atoms/Tab';
import MainNav from '../components/molecules/MainNav';
import AuthNav from '../components/molecules/AuthNav';
import ActionButton from '../components/atoms/ActionButton';
import Interval, { intervalTypes } from '../components/atoms/Interval';
import Timeline from '../components/molecules/TImeline';
import Arrow, { arrowTypes } from '../components/atoms/Arrow';
import Label, { labelTypes, types } from '../components/atoms/Label';
import TextInput from '../components/atoms/TextInput';
import SelectInput from '../components/atoms/SelectInput';
import NumberInput from '../components/atoms/NumberInput';
import Timer from '../components/atoms/Timer';
import DropButton from '../components/atoms/ViewMore';
import Toggle from '../components/atoms/Toggle';
import RadioButton from '../components/atoms/RadioButton';

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

const options = [
  { name: '00', value: 0 },
  { name: '01', value: 1 },
  { name: '02', value: 2 },
  { name: '03', value: 3 },
  { name: '04', value: 4 },
  { name: '05', value: 5 },
  { name: '06', value: 6 },
  { name: '07', value: 7 },
  { name: '08', value: 8 },
  { name: '09', value: 9 },
  { name: '10', value: 10 },
  { name: '11', value: 11 },
  { name: '12', value: 12 },
  { name: '13', value: 13 },
  { name: '14', value: 14 },
  { name: '15', value: 15 },
  { name: '16', value: 16 },
  { name: '17', value: 17 },
  { name: '18', value: 18 },
  { name: '19', value: 19 },
  { name: '20', value: 20 },
  { name: '21', value: 21 },
  { name: '22', value: 22 },
  { name: '23', value: 23 },

];

export default function Home() {
  return (
    // <div>
    //   <Head>
    //     <title>Create Next App</title>
    //     <meta name="description" content="Generated by create next app" />
    //   </Head>

    //   <div className='m-24'>
    //     {/* <TextInput
    //       bigLabel="Big Label"
    //       smallLabel="Small Label"
    //       successLabel="Password Strength: Excellent"
    //       errorLabel="Passwords don't match!"
    //     >
    //       Enter your password
    //     </TextInput> */}
    //     {/* <SelectInput /> */}
    //   </div>

    
    // </div>
    // <div className="m-32">
    //   <MainNav />
    // </div>
    <div className="m-24 inline-flex flex-col gap-48">
      {/* <SelectInput
        options={options}
        bigLabel="Big Label"
        smallLabel="Small Label"
        name="Select Hours"
        />
      
      <SelectInput
        options={options}
        bigLabel="Big Label"
        smallLabel="Small Label"
        name="Select Hours"
      /> */}

      {/* <NumberInput
        name="hour"
        initial={40}
        step={5}
        min={0}
        max={90}
        caption="min"
        widthStyle="w-64 420:w-78"
        bigLabel="Intervals"
        smallLabel="Hour"
      /> */}

      {/* <Timer type={intervalTypes.work} />
      <Timer type={intervalTypes.break} />
      <Timer type={intervalTypes.blocked} />
      <Timer type={intervalTypes.floating} /> */}
      {/* <DropButton
        activeText="Hide Timeline"
        inactiveText="Show Timeline"
      >
        <Timer type={intervalTypes.floating} />
      </DropButton> */}
      {/* <Toggle /> */}
      <RadioButton
        id="break"
        name="selectInterval"
        label="Work"
      />
      <RadioButton
        id="break"
        name="selectInterval"
        label="Break"
      />

    </div>
  )
}
