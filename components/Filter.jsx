import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Box,
  Button,
  Slider,
  Typography,
  Stack,
  Switch,
  FormControl,
  FormLabel,
  FormControlLabel,
  Chip,
  Link,
  RadioGroup,
  Radio
} from "@mui/material";
import SelectComponent from "./SelectComponent";

const categories = ["Magic", "Pokemon", "Digimon", "Yu-Gi-Oh!", "Sport Card"];
const conditionsByCardCategory = {
  "Magic": ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played", "Damaged"],
  "Pokemon": ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played", "Damaged"],
  "Digimon": ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played", "Damaged"],
  "Yu-Gi-Oh!": ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played", "Damaged"],
  "Sport Card": ["Near Mint", "Excellent", "Very good", "Poor"]
};

const Filter = () => {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [availability, setAvailability] = useState("");
  const [conditionsOptions, setConditionsOptions] = useState([]);
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const receivedCategory = searchParams.get("category") || "";
  const [filters, setFilters] = useState({ category: "", conditions: "", availability: "", search: "" });
  const areFiltersApplied = Object.values(filters).some(value => value);

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      category: receivedCategory
    }));
    setConditionsOptions(receivedCategory ? conditionsByCardCategory[receivedCategory] || [] : []);
  }, [receivedCategory]);

  useEffect(() => {
    // Set availability based on URL search params
    const availabilityFromUrl = searchParams.get("availability");
    if (availabilityFromUrl === "available" || availabilityFromUrl === "sold") {
      setAvailability(availabilityFromUrl);
    } else {
      setAvailability(""); // Reset to no selection
    }
  }, [searchParams]);

  useEffect(() => {
    if (searchTerm) {
      setFilters(prevFilters => ({
        ...prevFilters,
        search: searchTerm //set the search term into filters state
      }));
    }
  }, [searchTerm]);

  useEffect(() => {
    updateQueryStringAndNavigate();
  }, [filters, priceRange, receivedCategory]);

  const updateQueryStringAndNavigate = () => {
    const queryStringComponents = Object.entries({
      ...filters,
      priceFrom: priceRange[0],
      priceTo: priceRange[1]
    })
      .filter(([_, value]) => value || value === 0)
      .map(([key, value]) => `${key}=${encodeURIComponent(value)}`);

    const queryString = queryStringComponents.join("&");

    router.push(`/market/?${queryString}`);
  };

  const handleFilterChange = (filterId, value) => {
    // For category selections, also update conditionsOptions directly here
    if (filterId === "category") {
      setConditionsOptions(value ? conditionsByCardCategory[value] || [] : []);
      setFilters(prevFilters => ({ ...prevFilters, category: value, conditions: "", availability: "" }));
    } else {
      setFilters(prevFilters => ({ ...prevFilters, [filterId]: value }));
    }
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleAvailabilityChange = event => {
    setAvailability(event.target.value);
    setFilters(prevFilters => ({ ...prevFilters, availability: event.target.value }));
  };

  const clearFilters = () => {
    if (searchTerm) {
      router.push("/market");
    } else {
      setPriceRange([0, 5000]);
      setAvailability("");
      setFilters({ category: "", conditions: "", availability: "" });
      router.push("/market");
    }
  };

  const handleRemoveFilter = filterType => {
    if (filterType === "availability") {
      setAvailability(""); // reset radio button selection
    }
    setFilters(currentFilters => ({
      ...currentFilters,
      [filterType]: ""
    }));
  };

  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ m: 3 }}>
        <Box display="flex" justifyContent="flex-end" sx={{ mb: 2 }}>
          <Link variant="body2" onClick={clearFilters} sx={{ cursor: "pointer" }}>
            Reset Filters
          </Link>
        </Box>
        {areFiltersApplied && (
          <>
            <Typography gutterBottom sx={{ mb: 2 }}>
              Applied filters
            </Typography>
            <Stack direction="row" alignItems="center" flexWrap="wrap" spacing={2} sx={{ mb: 3 }}>
              {Object.entries(filters).map(([key, value]) => {
                if (value) {
                  return <Chip label={value.toLocaleLowerCase()} onDelete={() => handleRemoveFilter(key)} key={key} />;
                }
                return null;
              })}
            </Stack>
          </>
        )}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <RadioGroup
            row
            aria-label="availability"
            name="availability"
            value={availability}
            onChange={handleAvailabilityChange}>
            <FormControlLabel value="available" control={<Radio />} label="Available" />
            <FormControlLabel value="sold" control={<Radio />} label="Sold" />
          </RadioGroup>
        </FormControl>
        <Typography id="range-slider" gutterBottom sx={{ mb: 2 }}>
          Price range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={5000}
          sx={{ width: "100%", mb: 3 }}
        />
        <SelectComponent
          selectId="category"
          label="Category"
          options={categories}
          selectedValue={filters.category}
          onSelectionChange={handleFilterChange}
          sx={{ mb: 2 }}
        />
        {filters.category && (
          <SelectComponent
            selectId="conditions"
            label="Conditions"
            options={conditionsOptions}
            selectedValue={filters.conditions}
            onSelectionChange={handleFilterChange}
            sx={{ mb: 2 }}
          />
        )}
      </Box>
    </>
  );
};

export default Filter;
