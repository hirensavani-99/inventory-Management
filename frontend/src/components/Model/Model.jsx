import React from "react";
import { Formik, Form, Field } from "formik";
import axios from "axios";
import * as Yup from "yup";
import { useToast } from "@chakra-ui/react";
import {
  Button,
  Modal,
  ModalOverlay,
  ModalContent,
  ModalHeader,
  ModalFooter,
  ModalBody,
  ModalCloseButton,
  Box,
  VStack,
  FormControl,
  FormLabel,
  Input,
  HStack,
  Select,
  FormErrorMessage,
} from "@chakra-ui/react";

// Validation schema with Yup
const BookSchema = Yup.object().shape({
  title: Yup.string().required("Title is required").min(2, "Too Short!"),
  author: Yup.string().required("Author is required").min(2, "Too Short!"),
  genre: Yup.string().required("Genre is required"),
  publication_date: Yup.date().required("Publication Date is required"),
  isbn: Yup.string()
    .required("ISBN is required")
    .matches(/^\d{10}$/, "Must be exactly 10 digits"),
});

export default function BookModal({ isOpen, onOpen, onClose, SetUpdatteBook }) {
  const toast = useToast();
  return (
    <Modal isOpen={isOpen} size="xl" onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>Add New Book Data</ModalHeader>
        <ModalCloseButton />
        <ModalBody>
          <Box
            maxW="md"
            mx="auto"
            mt={8}
            p={4}
            borderWidth="1px"
            borderRadius="lg"
          >
            <Formik
              initialValues={{
                title: "",
                author: "",
                genre: "",
                publication_date: "",
                isbn: "",
              }}
              validationSchema={BookSchema}
              onSubmit={async (values) => {
                try {
                  const response = await axios.post(
                    "http://localhost:8080/add-book",
                    values
                  );
                  toast({
                    title: "Book added successfully",
                    status: "success",
                    duration: 5000,
                    isClosable: true,
                  });

                  SetUpdatteBook((prv) => !prv);
                } catch (e) {
                  toast({
                    title: "Failed to add book",
                    description: e.message || "Something went wrong",
                    status: "error",
                    duration: 5000,
                    isClosable: true,
                  });
                }
                onClose(); // Close the modal after submission
              }}
            >
              {({ errors, touched }) => (
                <Form>
                  <VStack spacing={4} align="stretch">
                    <HStack spacing={4}>
                      <FormControl isInvalid={!!errors.title && touched.title}>
                        <FormLabel htmlFor="title">Title</FormLabel>
                        <Field name="title">
                          {({ field }) => (
                            <Input
                              {...field}
                              id="title"
                              placeholder="Title.."
                            />
                          )}
                        </Field>
                        <FormErrorMessage>{errors.title}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={!!errors.author && touched.author}
                      >
                        <FormLabel htmlFor="author">Title</FormLabel>
                        <Field name="author">
                          {({ field }) => (
                            <Input
                              {...field}
                              id="author"
                              placeholder="Author.."
                            />
                          )}
                        </Field>
                        <FormErrorMessage>{errors.author}</FormErrorMessage>
                      </FormControl>
                    </HStack>

                    <HStack spacing={4}>
                      <FormControl isInvalid={!!errors.genre && touched.genre}>
                        <FormLabel>Genre</FormLabel>

                        <Field name="genre">
                          {({ field }) => (
                            <Select
                              {...field} // Spread the field props to bind the Select with Formik
                              placeholder="Select genre"
                            >
                              <option value="Fiction">Fiction</option>
                              <option value="Non-Fiction">Non-Fiction</option>
                              <option value="Sci-Fi">Sci-Fi</option>
                              <option value="Fantasy">Fantasy</option>
                              <option value="Biography">Biography</option>
                              <option value="Mystery">Mystery</option>
                            </Select>
                          )}
                        </Field>

                        <FormErrorMessage>{errors.genre}</FormErrorMessage>
                      </FormControl>

                      <FormControl
                        isInvalid={
                          !!errors.publication_date && touched.publication_date
                        }
                      >
                        <FormLabel htmlFor="publication_date">
                          Publication Date
                        </FormLabel>
                        <Field name="publication_date">
                          {({ field }) => (
                            <Input
                              {...field}
                              type="date"
                              id="publication_date"
                              placeholder="publication_date.."
                            />
                          )}
                        </Field>
                        <FormErrorMessage>
                          {errors.publication_date}
                        </FormErrorMessage>
                      </FormControl>
                    </HStack>

                    <FormControl isInvalid={!!errors.isbn && touched.isbn}>
                      <FormLabel htmlFor="isbn">Title</FormLabel>
                      <Field name="isbn">
                        {({ field }) => (
                          <Input
                            {...field}
                            id="isbn"
                            placeholder="0123456789"
                          />
                        )}
                      </Field>
                      <FormErrorMessage>{errors.isbn}</FormErrorMessage>
                    </FormControl>
                  </VStack>

                  <ModalFooter>
                    <Button colorScheme="blue" mr={3} onClick={onClose}>
                      Close
                    </Button>
                    <Button type="submit" colorScheme="green">
                      Add Book
                    </Button>
                  </ModalFooter>
                </Form>
              )}
            </Formik>
          </Box>
        </ModalBody>
      </ModalContent>
    </Modal>
  );
}
