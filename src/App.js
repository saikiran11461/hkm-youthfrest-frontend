import React from 'react';
import {
  ChakraProvider,
  Box,
  Text,
  Link,
  VStack,
  Code,
  Grid,
  theme,
} from '@chakra-ui/react';

import Main from './Main';
import {Routes,Route} from 'react-router-dom'
import CollegeManager from './CollegeManager';
import ThankYou from './ThankYou';
import Attendence from './Attendence';
import CandidateExport from './CandidateExport';
import AttendanceList from './AttendanceList';
import AdminQrScanner from './AdminQrScanner';
import AdminAttendanceScannedList from './AdminAttendanceScannedList';

function App() {
  return (
    <ChakraProvider theme={theme}>
      <Routes>
      <Route path='/' element={<Main/>}/>
      <Route path='/admin/college' element={<CollegeManager/>}/>
      <Route path='/thankyou/:id' element= {<ThankYou />}/>
      <Route path='/attendance' element= {<Attendence/>}/>
      <Route path='/admin' element={<CandidateExport/>}/>
      <Route path='/admin/attendance' element={<AttendanceList/>}/>
      <Route path='/admin/adminqrscanner' element={<AdminQrScanner/>} />
      <Route path='/admin/AdminAttendanceScannedList' element={<AdminAttendanceScannedList/>} />
      </Routes> 
    </ChakraProvider>
  );
}

export default App;
