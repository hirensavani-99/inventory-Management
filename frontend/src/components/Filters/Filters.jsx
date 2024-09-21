import React, { useState, useRef } from "react";

import {
  Input,
  useDisclosure,
  Drawer,
  DrawerBody,
  DrawerFooter,
  DrawerHeader,
  DrawerOverlay,
  DrawerContent,
  DrawerCloseButton,
  IconButton,
  Box,
  Stack,
  Select,
  Button,
} from "@chakra-ui/react";
import { CloseIcon, HamburgerIcon, SearchIcon } from "@chakra-ui/icons";

export default function Filters({ setFilterBy }) {
  // Hooks for model for small devices
  const { isOpen, onOpen, onClose } = useDisclosure();

  // Useref for tracking for filter input
  const titleInputRef = useRef("");
  const authorInputRef = useRef("");
  const genreInputRef = useRef("");
  const publicationYearInputRef = useRef("");

  // State handles Search and remoove btn enables and disables
  const [enableBtn, SetEnablleBtn] = useState(true);

  // Function update setFilterBy state of parent component
  const SetData = () => {
    // Getting values from input fields and trimming so space can not be consider
    const title = titleInputRef.current.value.trim();
    const author = authorInputRef.current.value.trim();
    const genre = genreInputRef.current.value.trim();
    const publicationYear = publicationYearInputRef.current.value.trim();

    // Define data , and whatever data is entered , set it to updateBy State
    const data = {};

    if (title != "") {
      data.title = title;
    }

    if (author != "") {
      data.author = author;
    }

    if (genre != "") {
      data.genre = genre;
    }

    if (publicationYear != "") {
      data.publication_date = publicationYear;
    }
    setFilterBy(data);
    onClose();
  };

  // Clear all the filter
  const removeFilters = () => {
    titleInputRef.current.value = "";
    authorInputRef.current.value = "";
    genreInputRef.current.value = "";
    publicationYearInputRef.current.value = "";
    setFilterBy({});
    SetEnablleBtn(true);
  };

  // When any input field will be changed will triggered the state
  const handleChange = () => {
    if (
      titleInputRef.current.value.trim() != "" ||
      authorInputRef.current.value.trim() != "" ||
      genreInputRef.current.value.trim() != "" ||
      publicationYearInputRef.current.value.trim() != ""
    ) {
      SetEnablleBtn(false);
    } else {
      SetEnablleBtn(true);
    }
  };
  return (
    <Box p={4} m={["10%", "8%", "6%", "4%"]}>
      {/* Hamburger Icon for Small Screens */}
      <IconButton
        display={{ base: "block", md: "none" }}
        aria-label="Open Filters"
        icon={<HamburgerIcon />}
        onClick={onOpen}
      />

      {/* Drawer for Filters in Small Screens */}
      <Drawer isOpen={isOpen} placement="top" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>Filter Options</DrawerHeader>

          <DrawerBody>
            <Stack spacing={4}>
              <Input
                placeholder="title.."
                ref={titleInputRef}
                onChange={handleChange}
              />
              <Input
                placeholder="author.."
                ref={authorInputRef}
                onChange={handleChange}
              />
              <Select
                id="genre"
                name="genre"
                placeholder="Select genre"
                ref={genreInputRef}
                onChange={handleChange}
              >
                <option value="Fiction">Fiction</option>
                <option value="Non-Fiction">Non-Fiction</option>
                <option value="Sci-Fi">Sci-Fi</option>
                <option value="Fantasy">Fantasy</option>
                <option value="Biography">Biography</option>
                <option value="Mystery">Mystery</option>
              </Select>
              <Input
                placeholder="Publication Year"
                type="number"
                ref={publicationYearInputRef}
                onChange={handleChange}
              />
              <Stack direction="row" spacing={2}>
                <IconButton
                  aria-label="Search database"
                  onClick={SetData}
                  isDisabled={enableBtn}
                  icon={<SearchIcon />}
                />
                <IconButton
                  aria-label="Remove filters"
                  bg="red.500"
                  color="white"
                  isDisabled={enableBtn}
                  onClick={removeFilters}
                  icon={<CloseIcon />}
                />
              </Stack>
            </Stack>
          </DrawerBody>

          <DrawerFooter>
            <Button variant="outline" mr={3} onClick={onClose}>
              Close
            </Button>
          </DrawerFooter>
        </DrawerContent>
      </Drawer>

      {/* Inline Filter Controls for Larger Screens */}
      <Stack
        direction={{ base: "column", md: "row" }}
        spacing={4}
        align="center"
        display={{ base: "none", md: "flex" }}
      >
        <Input
          placeholder="title.."
          ref={titleInputRef}
          onChange={handleChange}
        />
        <Input
          placeholder="author.."
          ref={authorInputRef}
          onChange={handleChange}
        />
        <Select
          id="genre"
          name="genre"
          placeholder="Select genre"
          ref={genreInputRef}
          onChange={handleChange}
        >
          <option value="Fiction">Fiction</option>
          <option value="Non-Fiction">Non-Fiction</option>
          <option value="Sci-Fi">Sci-Fi</option>
          <option value="Fantasy">Fantasy</option>
          <option value="Biography">Biography</option>
          <option value="Mystery">Mystery</option>
        </Select>
        <Input
          placeholder="Publication Year"
          type="number"
          ref={publicationYearInputRef}
          onChange={handleChange}
        />
        <Stack direction="row" spacing={2}>
          <IconButton
            aria-label="Search database"
            onClick={SetData}
            isDisabled={enableBtn}
            icon={<SearchIcon />}
          />
          <IconButton
            aria-label="Remove filters"
            bg="red.500"
            color="white"
            isDisabled={enableBtn}
            onClick={removeFilters}
            icon={<CloseIcon />}
          />
        </Stack>
      </Stack>
    </Box>
  );
}
