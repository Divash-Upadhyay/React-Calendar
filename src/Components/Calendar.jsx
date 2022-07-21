import React, { useState } from "react";
import {
  Container,
  Text,
  Box,
  Th,
  Table,
  Td,
  Thead,
  Tbody,
  Tr,
  SimpleGrid,
  Flex,
  HStack,
  VStack,
  TableContainer,
  Button,
  Grid,
  useColorMode,
  Spacer,
} from "@chakra-ui/react";
import moment from "moment";

const Calendar = () => {
  const { colorMode, toggleColorMode } = useColorMode();
  let weekdayshort = moment.weekdaysShort();
  //   console.log(weekdayshort);

  let weekdayshortname = weekdayshort.map((day) => {
    // console.log(day);
    return (
      <Th fontSize="xl" direction="row">
        {day}
      </Th>
    );
  });

  // State for months and date
  const [state, setState] = useState({
    dateObject: moment(),
    allmonths: moment.months(),
    showMonthTable: false,
  });

  const firstDayOfMonth = () => {
    let dateObject = state.dateObject;
    let firstDay = moment(dateObject).startOf("month").format("d");
    return firstDay;
  };

  let blanks = [];
  for (let i = 0; i < firstDayOfMonth(); i++) {
    blanks.push(<Td classNameName="calendar-day empty">{""}</Td>);
  }

  let currentDay = () => {
    return state.dateObject.format("D");
  };

  let daysInMonth = [];
  for (let d = 1; d <= 31; d++) {
    let currentD = d == currentDay() ? "today" : "";
    daysInMonth.push(
      <Td fontSize="xl" key={d} classNameName={`calendar-day ${currentD}`}>
        {d}
      </Td>
    );
  }

  var totalSlots = [...blanks, ...daysInMonth];
  let rows = [];
  let cells = [];

  totalSlots.forEach((row, i) => {
    if (i % 7 !== 0) {
      cells.push(row); // if index not equal 7 that means not go to next week
    } else {
      rows.push(cells); // when reach next week we contain all td in last week to rows
      cells = []; // empty container
      cells.push(row); // in current loop we still push current row to new container
    }
    if (i === totalSlots.length - 1) {
      // when end loop we add remain date
      rows.push(cells);
    }
  });
  let daysinmonth = rows.map((d, i) => {
    // console.log("d", d);
    return (
      <Tr>
        {d.map((e) => (
          <Td>{e}</Td>
        ))}
      </Tr>
    );
  });

  let month = () => {
    return state.dateObject.format("MMMM");
  };
  //   console.log(firstDayOfMonth());
  let months = [];
  state.allmonths.map((data) => {
    months.push(
      <td
        key={data}
        onClick={(e) => {
          setMonth(data);
        }}
      >
        <span>{data}</span>
      </td>
    );
  });

  let row = [];
  let cell = [];

  months.forEach((ro, i) => {
    if (i % 3 !== 0 || i == 0) {
      // except zero index
      cell.push(ro);
    } else {
      row.push(cell);
      cell = [];
      cell.push(ro);
    }
  });
  row.push(cell);
  console.log(row);

  let monthlist = row.map((d, i) => {
    console.log(d);
    return (
      <Tr>
        {d.map((e) => {
          return <Td>{e}</Td>;
        })}
      </Tr>
    );
  }); // add last row

  const setMonth = (month) => {
    let monthNo = state.allmonths.indexOf(month);
    console.log("monthNo", monthNo);
    let dateObject = Object.assign({}, state.dateObject);
    console.log(dateObject);
    dateObject = moment(dateObject).set("month", monthNo); // change month value
    setState({
      ...state,
      dateObject: dateObject,
      showMonthTable: !state.showMonthTable, // add to state
    });

    console.log(state);
  };

  const showMonth = (e, month) => {
    setState({ ...state, showMonthTable: !state.showMonthTable });
  };

  const year = () => {
    return state.dateObject.format("Y");
  };

  const yr = year();

  const YearTable = (yr) => {
    let months = [];
    let nextten = moment().set("year", yr);
    console.log(nextten);
  };
  YearTable();

  const onPrev = () => {
    let curr = "";
    if (state.showYearTable == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    setState({
      ...state,
      dateObject: state.dateObject.subtract(1, curr),
    });
  };

  const onNext = () => {
    let curr = "";
    if (state.showYearTable == true) {
      curr = "year";
    } else {
      curr = "month";
    }
    setState({
      ...state,
      dateObject: state.dateObject.add(1, curr),
    });
  };

  return (
    <Box w="50%" m="auto" mt="20" border="1px">
      <Flex h="50" justify="space-around" align="center">
        <Box fontSize="5xl">Calendar</Box>
        <Box>
          <Button onClick={toggleColorMode}>
            <i className="fas fa-moon"></i>
          </Button>
        </Box>
      </Flex>

      <br />
      <br />
      <Flex justify="space-evenly">
        <Text onClick={(e) => onPrev()}>
          <i className="fa-solid fa-angle-left fa-xl"></i>
        </Text>
        <Text
          onMouseOver=""
          fontSize="2xl"
          onClick={(e) => showMonth()}
          textAlign="center"
          bg="ActiveBorder"
        >
          {month()}
        </Text>
        <Text fontSize="2xl">{year()}</Text>
        <Text onClick={(e) => onNext()}>
          <i className="fa-solid fa-angle-right fa-xl"></i>
        </Text>
      </Flex>
      <br />
      <br />
      {state.showMonthTable && (
        <Table>
          <Thead>
            <Tr>
              <Th colSpan="4">Select a Month</Th>
            </Tr>
          </Thead>
          <Tbody>{monthlist}</Tbody>
        </Table>
      )}

      {!state.showMonthTable && (
        <Table variant="unstyled" colorScheme="facebook" size="sm">
          <Thead>
            <Tr>{weekdayshortname}</Tr>
          </Thead>
          <Tbody>{daysinmonth}</Tbody>
        </Table>
      )}
    </Box>
  );
};

export default Calendar;
