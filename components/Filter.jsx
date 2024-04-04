import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/navigation";
import { Box, Button, Slider, Typography, Switch, FormControlLabel } from "@mui/material";
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
  const [isAvailableChecked, setIsAvailableChecked] = useState(true);
  const [conditionsOptions, setConditionsOptions] = useState([]);
  const [filters, setFilters] = useState({ category: "", conditions: "", availability: "available" });
  const router = useRouter();
  const searchParams = useSearchParams();
  const searchTerm = searchParams.get("search") || "";
  const receivedCategory = searchParams.get("category") || "";

  useEffect(() => {
    setFilters(prevFilters => ({
      ...prevFilters,
      category: receivedCategory
    }));
    setConditionsOptions(receivedCategory ? conditionsByCardCategory[receivedCategory] || [] : []);
  }, [receivedCategory]);

  useEffect(() => {
    const availabilityStatus = isAvailableChecked ? "available" : "sold";

    setFilters(prevFilters => ({
      ...prevFilters,
      availability: availabilityStatus
    }));
  }, [isAvailableChecked]);

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

    if (searchTerm) {
      queryStringComponents.push(`search=${encodeURIComponent(searchTerm.trim())}`);
    }

    const queryString = queryStringComponents.join("&");

    router.push(`/market/?${queryString}`);
  };

  const handleFilterChange = (filterId, value) => {
    // For category selections, also update conditionsOptions directly here
    if (filterId === "category") {
      setConditionsOptions(value ? conditionsByCardCategory[value] || [] : []);
      setIsAvailableChecked(true);
      setFilters(prevFilters => ({ ...prevFilters, category: value, conditions: "", availability: "available" }));
    } else {
      setFilters(prevFilters => ({ ...prevFilters, [filterId]: value }));
    }
  };

  const handlePriceRangeChange = (event, newValue) => {
    setPriceRange(newValue);
  };

  const clearFilters = () => {
    if (searchTerm) {
      router.push("/market");
    } else {
      setPriceRange([0, 5000]);
      setIsAvailableChecked(true);
      setFilters({ category: "", conditions: "", availability: "available" });
      router.push("/market");
    }
  };

  return (
    <>
      <Box display="flex" flexDirection="column" sx={{ m: 3 }}>
        <FormControlLabel
          control={
            <Switch checked={isAvailableChecked} onChange={event => setIsAvailableChecked(event.target.checked)} />
          }
          label={isAvailableChecked ? "Available" : "Sold"}
        />
        <Typography id="range-slider" gutterBottom>
          Price range
        </Typography>
        <Slider
          value={priceRange}
          onChange={handlePriceRangeChange}
          valueLabelDisplay="auto"
          aria-labelledby="range-slider"
          min={0}
          max={5000}
          sx={{ width: "100%", mx: "auto" }}
        />
        <SelectComponent
          selectId="category"
          label="Category"
          options={categories}
          selectedValue={filters.category}
          onSelectionChange={(filterId, value) => handleFilterChange(filterId, value)}
        />
        {filters.category && (
          <SelectComponent
            selectId="conditions"
            label="Conditions"
            options={conditionsOptions}
            selectedValue={filters.conditions}
            onSelectionChange={(filterId, value) => handleFilterChange(filterId, value)}
          />
        )}
        <Button variant="outlined" onClick={clearFilters} sx={{ mt: 2 }}>
          Clear Filters
        </Button>
      </Box>
    </>
  );
};

export default Filter;
