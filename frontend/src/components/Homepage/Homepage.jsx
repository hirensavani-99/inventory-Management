import React, { useState, useEffect } from "react";
import Filters from "../Filters/Filters";
import Books, { LoaderBook } from "../Book/Book";
import axios from "axios";
import { motion } from "framer-motion";
import { useToast } from "@chakra-ui/react";

// Main page to display all books (Parent component)
export default function Homepage() {
  //State
  const [books, setBooks] = useState([]);
  const [allBooks, setallBooks] = useState([]);
  const [filterBy, setFilterBy] = useState({});
  const [loading, setLoading] = useState(false);
  const [updateBook, SetUpdatteBook] = useState(false);
  const toast = useToast();

  // Update books based upon filters : FilterBy causing useEffect run
  useEffect(() => {
    setLoading(true);
    setBooks([]);

    // Filtering Data based on filteredBy
    if (Object.keys(filterBy).length) {
      const filtered = allBooks.filter((book) => {
        // In case match returns true which will take & In case not match return false which will not take
        for (let key in filterBy) {
          if (book[key]?.toLowerCase().includes(filterBy[key]?.toLowerCase())) {
            return true;
          }
        }

        return false;
      });

      // If there were no books
      if (filtered.length == 0) {
        toast({
          title: "No books found",
          status: "info",
          isClosable: true,
        });
      } else {
        setBooks(filtered);
      }
    } else {
      setBooks(allBooks);
    }
    setLoading(false);
  }, [filterBy]);

  // Getting all the books initially and after saving books
  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:8080/books");

        setallBooks(response.data.books);
        setBooks(response.data.books);
      } catch (e) {
        toast({
          title: "Unable to fetch Books !",
          status: "Error",
          isClosable: true,
        });
      }

      setLoading(false);
    };
    fetchData();
  }, [updateBook]);
  return (
    <div>
      <Filters setFilterBy={setFilterBy} />
      {books.length == 0 && loading && <LoaderBook />}
      {books && !loading && (
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 20 }}
          transition={{ duration: 0.8, ease: "easeInOut", delay: 0.5 }}
        >
          <Books books={books} SetUpdatteBook={SetUpdatteBook} />
        </motion.div>
      )}
    </div>
  );
}
