import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import {
  Box,
  Slider,
  Typography,
  Stack,
  FormControl,
  FormControlLabel,
  Chip,
  Link,
  RadioGroup,
  Radio
} from "@mui/material";
import SelectComponent from "./SelectComponent";
import useDebounce from "@/hooks/useDebounce";

const categories = ["Magic", "Pokemon", "Digimon", "Yu-Gi-Oh!", "Sport Card"];
const conditionsByCardCategory = {
  "Magic": ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played", "Damaged"],
  "Pokemon": ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played", "Damaged"],
  "Digimon": ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played", "Damaged"],
  "Yu-Gi-Oh!": ["Near Mint", "Lightly Played", "Moderately Played", "Heavily Played", "Damaged"],
  "Sport Card": ["Near Mint", "Excellent", "Very good", "Poor"]
};

const Filter = ({ filtersParams }) => {
  const [priceRange, setPriceRange] = useState([0, 5000]);
  const [conditionsOptions, setConditionsOptions] = useState([]);
  const [filters, setFilters] = useState({ category: "", conditions: "", availability: "", search: "" });
  const debouncedPriceRange = useDebounce(priceRange, 500);
  const router = useRouter();
  const searchParams = useSearchParams();

  const areFiltersApplied = Object.values(filters).some(value => value);

  useEffect(() => {
    setFilters({
      search: filtersParams.search || "",
      category: filtersParams.category || "",
      conditions: filtersParams.conditions || "",
      availability: filtersParams.availability || ""
      
    });
    //rendering correct conditions after redirection from other page with category in the params
    setConditionsOptions(filtersParams.category? conditionsByCardCategory[filtersParams.category] || [] : []);
  }, [searchParams]);

  useEffect(() => {
    updateQueryStringAndNavigate();
  }, [filters, debouncedPriceRange, filtersParams.category, filtersParams.search ]);

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
    //rendering correct conditions' options based on the selected category in the select form
    //and resetting the conditions filter to ensure consistency. Else, just updating the filter with the new value.
    if (filterId === "category") {
      setConditionsOptions(value ? conditionsByCardCategory[value] || [] : []);
      setFilters(prevFilters => ({ ...prevFilters, category: value, conditions: "" }));
    } else {
      setFilters(prevFilters => ({ ...prevFilters, [filterId]: value }));
    }
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const handleAvailabilityChange = event => {
    const newAvailability = event.target.value;
    setFilters(prevFilters => ({
      ...prevFilters,
      availability: newAvailability
    }));
  };

  const clearFilters = () => {
    setPriceRange([0, 5000]);
    setFilters({ category: "", conditions: "", availability: "", search: "" });
    router.push("/market");
  };

  const handleRemoveFilter = filterType => {
    setFilters(currentFilters => ({
      ...currentFilters,
      [filterType]: ""
    }));
  };

  return (
    <>
      <Box
        display="flex"
        flexDirection="column"
        sx={{
          m: { sm: 3 },
          mr: { xs: 3 },
          ml: { xs: 3 }
        }}>
        <Box
          display="flex"
          justifyContent="flex-end"
          sx={{
            mb: { xs: 0, sm: 2 },
            mr: { xs: 2, sm: 0 }
          }}>
          <Link variant="body2" onClick={clearFilters} sx={{ cursor: "pointer" }}>
            Reset Filters
          </Link>
        </Box>
        {areFiltersApplied ? (
          <>
            <Typography gutterBottom sx={{ mb: 1 }}>
              Applied filters
            </Typography>
            <Stack
              direction="row"
              alignItems="flex-start"
              flexWrap="wrap"
              spacing={1}
              sx={{ minHeight: "80px", mb: 1 }}>
              {Object.entries(filters).map(([key, value]) => {
                if (value) {
                  return <Chip label={value.toLocaleLowerCase()} onDelete={() => handleRemoveFilter(key)} key={key} />;
                }
                return null;
              })}
            </Stack>
          </>
        ) : (
          <Box sx={{ height: "1rem" }} />
        )}
        <FormControl component="fieldset" sx={{ mb: 3 }}>
          <RadioGroup
            row
            aria-label="availability"
            name="availability"
            value={filters.availability}
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
          step={50}
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
