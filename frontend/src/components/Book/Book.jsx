import React from "react";
import BookModal from "../Model/Model";
import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Stack,
  Skeleton,
  Button,
  Flex,
  Box,
  useDisclosure,
} from "@chakra-ui/react";
import { DownloadIcon, AddIcon } from "@chakra-ui/icons";

// Responsible for showing Book Table
export default function Books({ books, SetUpdatteBook }) {
  //Hooks to handle Moodel which will help to add new book
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Keys of the object to create column header
  const keys = books.length != 0 ? Object.keys(books[0]) : [];

  // Convert CSV
  const convertToCSV = (data) => {
    const csvRows = [];
    const headers = Object.keys(data[0]);

    //Creating single string seprated by , ex "title,author,genre,publication_date,isbn"
    csvRows.push(headers.join(","));

    // Creates value for keys in same way
    data.forEach((row) => {
      const values = headers.map((header) => row[header]);
      csvRows.push(values.join(","));
    });

    // converting that array to  single string
    return csvRows.join("\n");
  };

  // Function to trigger CSV download
  const downloadCSV = (data, filename = "data.csv") => {
    // single string seprrated by , and newline will be converted in to CSV file formate
    const csvContent = convertToCSV(data);
    const blob = new Blob([csvContent], { type: "text/csv" });
    const url = window.URL.createObjectURL(blob);

    //Creating link to downlooad file
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  // Download Json
  const downloadJSON = (data, filename = "data.json") => {
    // Converting array of object type data in to Json string type
    const jsonContent = JSON.stringify(data, null, 2);
    const blob = new Blob([jsonContent], { type: "application/json" });
    const url = window.URL.createObjectURL(blob);

    //Creating link to downlooad file
    const a = document.createElement("a");
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <TableContainer m={{ base: "2%", md: "5%" }}>
      <Flex
        justifyContent={{ base: "center", md: "flex-end" }}
        mb={4}
        wrap="nowrap"
        direction="row"
        flexWrap="nowrap"
        position="sticky"
        top="0"
        zIndex="10"
        p="10px"
      >
        <Button
          m={{ base: "5px", md: "10px" }}
          leftIcon={<DownloadIcon />}
          colorScheme="blue"
          variant="solid"
          onClick={() => downloadCSV(books)}
          fontSize={{ base: "sm", md: "md" }}
        >
          CSV
        </Button>
        <Button
          m={{ base: "5px", md: "10px" }}
          leftIcon={<DownloadIcon />}
          colorScheme="blue"
          variant="solid"
          onClick={() => downloadJSON(books)}
          fontSize={{ base: "sm", md: "md" }}
        >
          JSON
        </Button>
        <Button
          m={{ base: "5px", md: "10px" }}
          leftIcon={<AddIcon />}
          colorScheme="blue"
          variant="solid"
          onClick={onOpen}
          fontSize={{ base: "sm", md: "md" }}
        >
          Add Book
        </Button>
      </Flex>

      <BookModal
        onOpen={onOpen}
        onClose={onClose}
        isOpen={isOpen}
        SetUpdatteBook={SetUpdatteBook}
      />

      <Box overflowX="auto">
        <Table
          variant="striped"
          colorScheme="teal"
          size={{ base: "sm", md: "md" }}
        >
          <Thead>
            <Tr>
              {keys.map((key) => (
                <Th
                  key={key}
                  display={{
                    base: key === "id" ? "none" : "table-cell",
                    md: "table-cell",
                  }}
                >
                  {key}
                </Th>
              ))}
            </Tr>
          </Thead>
          <Tbody>
            {books.map((book) => (
              <Tr key={book.id}>
                <Td display={{ base: "none", md: "table-cell" }}>{book.id}</Td>
                <Td>{book.title}</Td>
                <Td>{book.author}</Td>
                <Td>{book.genre}</Td>
                <Td>{book.publication_date}</Td>
                <Td>{book.isbn}</Td>
              </Tr>
            ))}
          </Tbody>
        </Table>
      </Box>
    </TableContainer>
  );
}

// Loder for table
const LoaderBook = () => {
  return (
    <Stack m="5%">
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
      <Skeleton height="20px" />
    </Stack>
  );
};

export { LoaderBook };
