// Mock database implementation
class MockDatabase {
  private tables: Record<string, any[]>

  constructor() {
    // Initialize with some mock data
    this.tables = {
      sales: this.generateSalesData(),
      customers: this.generateCustomerData(),
      products: this.generateProductData(),
      orders: this.generateOrderData(),
      employees: this.generateEmployeeData(),
    }
  }

  getTables(): string[] {
    return Object.keys(this.tables)
  }

  getTableData(tableName: string): any[] {
    return this.tables[tableName] || []
  }

  executeQuery(sqlQuery: string): any[] {
    console.log(`Executing query: ${sqlQuery}`)

    // This is a simplified mock implementation
    // In a real system, we would parse and execute the SQL

    // Return appropriate mock data based on the query
    if (sqlQuery.includes("sales") && sqlQuery.includes("region")) {
      return [
        { region: "North America", sales: 1245000 },
        { region: "Europe", sales: 1042000 },
        { region: "Asia", sales: 897000 },
        { region: "South America", sales: 645000 },
        { region: "Africa", sales: 392000 },
        { region: "Oceania", sales: 287000 },
      ]
    }

    if (sqlQuery.includes("country") && sqlQuery.includes("customers")) {
      return [
        { country: "United States", customers: 12450 },
        { country: "United Kingdom", customers: 8970 },
        { country: "Germany", customers: 7650 },
        { country: "France", customers: 6540 },
        { country: "Japan", customers: 5430 },
        { country: "Canada", customers: 4320 },
      ]
    }

    if (sqlQuery.includes("month") && sqlQuery.includes("order")) {
      return [
        { month: "2023-01", revenue: 1245000 },
        { month: "2023-02", revenue: 1356000 },
        { month: "2023-03", revenue: 1467000 },
        { month: "2023-04", revenue: 1578000 },
        { month: "2023-05", revenue: 1689000 },
        { month: "2023-06", revenue: 1790000 },
      ]
    }

    if (sqlQuery.includes("product") && sqlQuery.includes("quantity")) {
      return [
        { product_name: "Smartphone X", quantity_sold: 12450 },
        { product_name: "Laptop Pro", quantity_sold: 8970 },
        { product_name: "Wireless Earbuds", quantity_sold: 7650 },
        { product_name: "Smart Watch", quantity_sold: 6540 },
        { product_name: "Tablet Ultra", quantity_sold: 5430 },
        { product_name: "Bluetooth Speaker", quantity_sold: 4320 },
      ]
    }

    // Default response
    return [
      { id: 1, value: "Sample data 1" },
      { id: 2, value: "Sample data 2" },
      { id: 3, value: "Sample data 3" },
    ]
  }

  // Data generation methods
  private generateSalesData(): any[] {
    return Array.from({ length: 1000 }, (_, i) => ({
      id: i + 1,
      product_id: Math.floor(Math.random() * 100) + 1,
      customer_id: Math.floor(Math.random() * 500) + 1,
      sales_amount: Math.floor(Math.random() * 1000) + 100,
      region: this.getRandomRegion(),
      sale_date: this.getRandomDate(new Date("2022-01-01"), new Date("2023-12-31")),
    }))
  }

  private generateCustomerData(): any[] {
    return Array.from({ length: 500 }, (_, i) => ({
      id: i + 1,
      customer_name: `Customer ${i + 1}`,
      country: this.getRandomCountry(),
      email: `customer${i + 1}@example.com`,
      join_date: this.getRandomDate(new Date("2020-01-01"), new Date("2023-12-31")),
    }))
  }

  private generateProductData(): any[] {
    return Array.from({ length: 100 }, (_, i) => ({
      id: i + 1,
      product_name: `Product ${i + 1}`,
      category: this.getRandomCategory(),
      price: Math.floor(Math.random() * 500) + 50,
      in_stock: Math.random() > 0.2,
    }))
  }

  private generateOrderData(): any[] {
    return Array.from({ length: 2000 }, (_, i) => ({
      id: i + 1,
      customer_id: Math.floor(Math.random() * 500) + 1,
      order_date: this.getRandomDate(new Date("2022-01-01"), new Date("2023-12-31")),
      order_total: Math.floor(Math.random() * 2000) + 100,
      status: this.getRandomOrderStatus(),
    }))
  }

  private generateEmployeeData(): any[] {
    return Array.from({ length: 50 }, (_, i) => ({
      id: i + 1,
      name: `Employee ${i + 1}`,
      department: this.getRandomDepartment(),
      hire_date: this.getRandomDate(new Date("2018-01-01"), new Date("2023-12-31")),
      salary: Math.floor(Math.random() * 50000) + 50000,
    }))
  }

  // Helper methods for generating random data
  private getRandomRegion(): string {
    const regions = ["North America", "Europe", "Asia", "South America", "Africa", "Oceania"]
    return regions[Math.floor(Math.random() * regions.length)]
  }

  private getRandomCountry(): string {
    const countries = [
      "United States",
      "United Kingdom",
      "Germany",
      "France",
      "Japan",
      "Canada",
      "Australia",
      "China",
      "Brazil",
      "India",
    ]
    return countries[Math.floor(Math.random() * countries.length)]
  }

  private getRandomCategory(): string {
    const categories = [
      "Electronics",
      "Clothing",
      "Home & Kitchen",
      "Books",
      "Sports",
      "Beauty",
      "Toys",
      "Automotive",
      "Health",
    ]
    return categories[Math.floor(Math.random() * categories.length)]
  }

  private getRandomOrderStatus(): string {
    const statuses = ["Completed", "Processing", "Shipped", "Cancelled", "Refunded"]
    return statuses[Math.floor(Math.random() * statuses.length)]
  }

  private getRandomDepartment(): string {
    const departments = ["Sales", "Marketing", "Engineering", "HR", "Finance", "Customer Support", "Operations"]
    return departments[Math.floor(Math.random() * departments.length)]
  }

  private getRandomDate(start: Date, end: Date): string {
    const date = new Date(start.getTime() + Math.random() * (end.getTime() - start.getTime()))
    return date.toISOString().split("T")[0]
  }
}

export const mockDatabase = new MockDatabase()

