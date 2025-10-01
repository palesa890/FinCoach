import React from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

export default function TransactionFilters({ filters, onFilterChange, transactions }) {
  const categories = ["all", ...new Set(transactions.map(t => t.category))];
  const moods = ["all", ...new Set(transactions.map(t => t.mood).filter(Boolean))];
  const classifications = ["all", "need", "want", "saving", "investment"];

  const handleFilterChange = (filterType, value) => {
    onFilterChange(prev => ({
      ...prev,
      [filterType]: value
    }));
  };

  return (
    <div className="grid grid-cols-2 md:grid-cols-5 gap-3">
      <Select value={filters.type} onValueChange={(value) => handleFilterChange("type", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Types</SelectItem>
          <SelectItem value="income">Income</SelectItem>
          <SelectItem value="expense">Expense</SelectItem>
        </SelectContent>
      </Select>

      <Select value={filters.category} onValueChange={(value) => handleFilterChange("category", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Category" />
        </SelectTrigger>
        <SelectContent>
          {categories.map(category => (
            <SelectItem key={category} value={category}>
              {category === "all" ? "All Categories" : category}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.classification} onValueChange={(value) => handleFilterChange("classification", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Type" />
        </SelectTrigger>
        <SelectContent>
          {classifications.map(classification => (
            <SelectItem key={classification} value={classification}>
              {classification === "all" ? "All Types" : classification}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.mood} onValueChange={(value) => handleFilterChange("mood", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Mood" />
        </SelectTrigger>
        <SelectContent>
          {moods.map(mood => (
            <SelectItem key={mood} value={mood}>
              {mood === "all" ? "All Moods" : mood}
            </SelectItem>
          ))}
        </SelectContent>
      </Select>

      <Select value={filters.dateRange} onValueChange={(value) => handleFilterChange("dateRange", value)}>
        <SelectTrigger>
          <SelectValue placeholder="Date Range" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="all">All Time</SelectItem>
          <SelectItem value="today">Today</SelectItem>
          <SelectItem value="week">This Week</SelectItem>
          <SelectItem value="month">This Month</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
}