import { Card, Button, CircularProgress } from "@mui/material";
import SingleFlagTranData from "./SingleFlagTranData";
import { useEffect, useState } from "react";
import axios from "axios";

function AllFlaggedTranData() {
  const [isDataLoaded, setIsDataLoaded] = useState(false);
  const [accordionItems, setAccordionItems] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchData = async () => {
    setLoading(true);
    try {
    //   setAccordionItems(
    //     [
    //         {
    //             "row_index": 1,
    //             "violations_data": {
    //                 "violations_data": [
    //                     {
    //                         "violation": "Customer ID: Invalid format (contains a decimal). Country: Invalid format (should be a 2-letter ISO code). Industry Code: Invalid format (should be an integer). Origination Date: Invalid format (should be yyyy-mm-dd). Interest Rate: Invalid format (should be a decimal). Collateral Type: Invalid value (should be an integer). Syndicated Loan Flag: Invalid value (should be an integer). Disposition Flag: Invalid value (should be an integer).",
    //                         "remediation": "Customer ID: Remove the decimal and format as a string. Country: Correct to a valid 2-letter ISO code (e.g., AO -> ?). Industry Code: Convert to an integer (e.g., 3522). Origination Date: Correct the date format to yyyy-mm-dd (e.g., 2022-02-18). Interest Rate: Convert to a decimal format (e.g., 0.0976). Collateral Type: Provide a valid integer value from the predefined codes. Syndicated Loan Flag: Provide a valid integer value from the predefined codes. Disposition Flag: Provide a valid integer value from the predefined codes."
    //                     }
    //                 ],
    //                 "violation_exists": true,
    //                 "risk_score": "85"
    //             },
    //             "row": {
    //                 "Customer ID": 95384400000000.0,
    //                 "Internal Obligor ID": "4c78e161-7f3e-4858-8569-63ded30ecb0f",
    //                 "Obligor Name": "Armstrong, Griffith and Dickerson",
    //                 "City": "West Justin",
    //                 "Country": "AO",
    //                 "Industry Code": 3522,
    //                 "Internal Risk Rating": "E",
    //                 "Taxpayer ID (TIN)": "313-51-2957",
    //                 "Stock Exchange": "LSE",
    //                 "Ticker Symbol": "nYQ",
    //                 "CUSIP": "UZKcBa",
    //                 "Internal Credit Facility ID": "b10f0d6a-b4ad-405c-9a4f-4f02119be381",
    //                 "Origination Date": "18-02-2022",
    //                 "Maturity Date": "29-10-2033",
    //                 "Credit Facility Type": "Revolving",
    //                 "Credit Facility Purpose": "Working Capital",
    //                 "Loan Amount": 55748379.42,
    //                 "Outstanding Balance": 2783436.06,
    //                 "Interest Rate": 9.76,
    //                 "Collateral Type": null,
    //                 "Loan Status": "Closed",
    //                 "Payment Frequency": "Monthly",
    //                 "Currency": "EUR",
    //                 "Loan Grade": "B",
    //                 "Syndicated Loan Flag": "Yes",
    //                 "Disposition Flag": "Retained",
    //                 "Guarantor ID": "eef807cf-9d5f-4f5c-91cd-116b1d2c1ef2",
    //                 "Guarantor Name": "Hood-Cruz",
    //                 "Guarantor Rating": "B",
    //                 "Loan to Value Ratio": 1.37,
    //                 "Debt Service Coverage Ratio": 2.0,
    //                 "Total Assets": 435705344.2,
    //                 "Total Liabilities": 47117668.95,
    //                 "EBITDA": 80132376.18,
    //                 "Net Income": 7141931.68,
    //                 "Total Revenue": 319616293.0,
    //                 "Total Equity": 156044133.2,
    //                 "Cash Flow": 21245173.43,
    //                 "Interest Coverage Ratio": 3.1,
    //                 "Loan Default Probability": 0.1
    //             }
    //         },
    //         {
    //             "row_index": 2,
    //             "violations_data": {
    //                 "violations_data": [
    //                     {
    //                         "violation": "Customer ID: Invalid format (contains a decimal). Country: Invalid format (should be a 2-letter ISO code). Industry Code: Invalid format (should be a valid NAICS, SIC, or GICS code). Origination Date: Invalid format (should be yyyy-mm-dd). Interest Rate: Invalid format (should be a decimal). Credit Facility Type: Invalid value (should be one of the predefined codes). Credit Facility Purpose: Invalid value (should be one of the predefined codes). Collateral Type: Invalid value (should be one of the predefined codes). Syndicated Loan Flag: Invalid value (should be an integer). Disposition Flag: Invalid value (should be an integer).",
    //                         "remediation": "Customer ID: Remove the decimal and format as a string. Country: Correct to a valid 2-letter ISO code (e.g., MD -> ?). Industry Code: Validate against NAICS, SIC, or GICS code (e.g., if it's a NAICS, confirm it is within the valid range). Origination Date: Correct the date format to yyyy-mm-dd (e.g., 2020-06-20 -> 2020-06-20). Interest Rate: Convert to a decimal format (e.g., 0.0214). Credit Facility Type: Provide a valid integer value from the predefined codes. Credit Facility Purpose: Provide a valid integer value from the predefined codes. Collateral Type: Provide a valid integer value from the predefined codes. Syndicated Loan Flag: Provide a valid integer value from the predefined codes. Disposition Flag: Provide a valid integer value from the predefined codes."
    //                     }
    //                 ],
    //                 "violation_exists": true,
    //                 "risk_score": "90"
    //             },
    //             "row": {
    //                 "Customer ID": 85207400000000.0,
    //                 "Internal Obligor ID": "d8eba8b3-4a74-472c-9c35-5e776788c5b1",
    //                 "Obligor Name": "Liu, Weaver and Choi",
    //                 "City": "Kimberlyfort",
    //                 "Country": "MD",
    //                 "Industry Code": 9984,
    //                 "Internal Risk Rating": "C",
    //                 "Taxpayer ID (TIN)": "310-37-1725",
    //                 "Stock Exchange": "NASDAQ",
    //                 "Ticker Symbol": "vmj",
    //                 "CUSIP": "LpWDlN",
    //                 "Internal Credit Facility ID": "9f03c0f0-d92d-4245-815c-53bdf1ca667e",
    //                 "Origination Date": "20-06-2020",
    //                 "Maturity Date": "21-11-2034",
    //                 "Credit Facility Type": "Bridge Loan",
    //                 "Credit Facility Purpose": "Expansion",
    //                 "Loan Amount": 97602997.48,
    //                 "Outstanding Balance": 80537734.2,
    //                 "Interest Rate": 2.14,
    //                 "Collateral Type": "Equipment",
    //                 "Loan Status": "Closed",
    //                 "Payment Frequency": "Quarterly",
    //                 "Currency": "GBP",
    //                 "Loan Grade": "A",
    //                 "Syndicated Loan Flag": "Yes",
    //                 "Disposition Flag": "Disposed",
    //                 "Guarantor ID": "80fa2009-8fb3-48db-a114-3d01e35f4029",
    //                 "Guarantor Name": "Carlson-Cole",
    //                 "Guarantor Rating": "B",
    //                 "Loan to Value Ratio": 0.8,
    //                 "Debt Service Coverage Ratio": 2.38,
    //                 "Total Assets": 403948022.4,
    //                 "Total Liabilities": 8926425.41,
    //                 "EBITDA": 86863480.34,
    //                 "Net Income": 1955854.73,
    //                 "Total Revenue": 451241665.5,
    //                 "Total Equity": 160851816.4,
    //                 "Cash Flow": 7161645.8,
    //                 "Interest Coverage Ratio": 1.06,
    //                 "Loan Default Probability": 0.08
    //             }
    //         },
    //         {
    //             "row_index": 3,
    //             "violations_data": {
    //                 "violations_data": [
    //                     {
    //                         "violation": "Customer ID: Invalid format (contains a decimal). Country: Invalid format (should be a 2-letter ISO code). Industry Code: Invalid format (should be a valid NAICS, SIC, or GICS code). Origination Date: Invalid format (should be yyyy-mm-dd). Interest Rate: Invalid format (should be a decimal). Credit Facility Type: Invalid value (should be one of the predefined codes). Credit Facility Purpose: Invalid value (should be one of the predefined codes). Collateral Type: Invalid value (should be one of the predefined codes). Syndicated Loan Flag: Invalid value (should be an integer). Disposition Flag: Invalid value (should be an integer).",
    //                         "remediation": "Customer ID: Remove the decimal and format as a string. Country: Correct to a valid 2-letter ISO code (e.g., LK -> ?). Industry Code: Validate against NAICS, SIC, or GICS code (e.g., if it's a NAICS, confirm it is within the valid range). Origination Date: Correct the date format to yyyy-mm-dd (e.g., 2023-08-26 -> 2023-08-26). Interest Rate: Convert to a decimal format (e.g., 0.029). Credit Facility Type: Provide a valid integer value from the predefined codes. Credit Facility Purpose: Provide a valid integer value from the predefined codes. Collateral Type: Provide a valid integer value from the predefined codes. Syndicated Loan Flag: Provide a valid integer value from the predefined codes. Disposition Flag: Provide a valid integer value from the predefined codes."
    //                     }
    //                 ],
    //                 "violation_exists": true,
    //                 "risk_score": "90"
    //             },
    //             "row": {
    //                 "Customer ID": 99329700000000.0,
    //                 "Internal Obligor ID": "d4cf2ac2-82e7-4ebc-b4be-efeecd8605fe",
    //                 "Obligor Name": "Luna, Knapp and Powers",
    //                 "City": "Port Nicholas",
    //                 "Country": "LK",
    //                 "Industry Code": 6392,
    //                 "Internal Risk Rating": "E",
    //                 "Taxpayer ID (TIN)": "447-80-2607",
    //                 "Stock Exchange": "NASDAQ",
    //                 "Ticker Symbol": "HYY",
    //                 "CUSIP": "YoVYBg",
    //                 "Internal Credit Facility ID": "d101c317-a06e-4a8f-8e63-d921c33b1a59",
    //                 "Origination Date": "26-08-2023",
    //                 "Maturity Date": "19-11-2029",
    //                 "Credit Facility Type": "Bridge Loan",
    //                 "Credit Facility Purpose": "Expansion",
    //                 "Loan Amount": 19714396.46,
    //                 "Outstanding Balance": 39263759.32,
    //                 "Interest Rate": 2.9,
    //                 "Collateral Type": "Real Estate",
    //                 "Loan Status": "Closed",
    //                 "Payment Frequency": "Annually",
    //                 "Currency": "INR",
    //                 "Loan Grade": "CCC",
    //                 "Syndicated Loan Flag": "Yes",
    //                 "Disposition Flag": "Retained",
    //                 "Guarantor ID": "9b5c021d-a121-4ae0-9675-dcec92ad211f",
    //                 "Guarantor Name": "Perez, Smith and Davidson",
    //                 "Guarantor Rating": "A",
    //                 "Loan to Value Ratio": 1.36,
    //                 "Debt Service Coverage Ratio": 2.9,
    //                 "Total Assets": 92416015.06,
    //                 "Total Liabilities": 213720317.6,
    //                 "EBITDA": 59098537.91,
    //                 "Net Income": 6667902.48,
    //                 "Total Revenue": 22780570.2,
    //                 "Total Equity": 100793798.8,
    //                 "Cash Flow": 10891482.19,
    //                 "Interest Coverage Ratio": 9.06,
    //                 "Loan Default Probability": 0.2
    //             }
    //         },
    //         {
    //             "row_index": 4,
    //             "violations_data": {
    //                 "violations_data": [
    //                     {
    //                         "violation": "Customer ID: Invalid format (contains a decimal). Country: Invalid format (should be a 2-letter ISO code). Industry Code: Invalid format (should be a valid NAICS, SIC, or GICS code). Origination Date: Invalid format (should be yyyy-mm-dd). Interest Rate: Invalid format (should be a decimal). Credit Facility Type: Invalid value (should be one of the predefined codes). Credit Facility Purpose: Invalid value (should be one of the predefined codes). Collateral Type: Invalid value (should be one of the predefined codes). Syndicated Loan Flag: Invalid value (should be an integer). Disposition Flag: Invalid value (should be an integer).",
    //                         "remediation": "Customer ID: Remove the decimal and format as a string. Country: Correct to a valid 2-letter ISO code (e.g., JP -> ?). Industry Code: Validate against NAICS, SIC, or GICS code (e.g., if it's a NAICS, confirm it is within the valid range). Origination Date: Correct the date format to yyyy-mm-dd (e.g., 2024-11-03 -> 2024-11-03). Interest Rate: Convert to a decimal format (e.g., 0.089). Credit Facility Type: Provide a valid integer value from the predefined codes. Credit Facility Purpose: Provide a valid integer value from the predefined codes. Collateral Type: Provide a valid integer value from the predefined codes. Syndicated Loan Flag: Provide a valid integer value from the predefined codes. Disposition Flag: Provide a valid integer value from the predefined codes."
    //                     }
    //                 ],
    //                 "violation_exists": true,
    //                 "risk_score": "90"
    //             },
    //             "row": {
    //                 "Customer ID": 38638400000000.0,
    //                 "Internal Obligor ID": "ba43160f-9404-4e4d-b32a-855e8dfcc560",
    //                 "Obligor Name": "Clark-Oconnor",
    //                 "City": "South Carolynmouth",
    //                 "Country": "JP",
    //                 "Industry Code": 2999,
    //                 "Internal Risk Rating": "A",
    //                 "Taxpayer ID (TIN)": "705-09-9417",
    //                 "Stock Exchange": "NASDAQ",
    //                 "Ticker Symbol": "EfQ",
    //                 "CUSIP": "tXIESl",
    //                 "Internal Credit Facility ID": "202d945b-3f59-4946-a1d0-1be5c8f89198",
    //                 "Origination Date": "03-11-2024",
    //                 "Maturity Date": "02-12-2028",
    //                 "Credit Facility Type": "Term Loan",
    //                 "Credit Facility Purpose": "Refinancing",
    //                 "Loan Amount": 17232454.13,
    //                 "Outstanding Balance": 86223792.99,
    //                 "Interest Rate": 8.9,
    //                 "Collateral Type": "Equipment",
    //                 "Loan Status": "Active",
    //                 "Payment Frequency": "Quarterly",
    //                 "Currency": "GBP",
    //                 "Loan Grade": "BB",
    //                 "Syndicated Loan Flag": "No",
    //                 "Disposition Flag": "Disposed",
    //                 "Guarantor ID": "f4c91d34-bc75-4713-9c85-fccdad2546a7",
    //                 "Guarantor Name": "Martinez-Burnett",
    //                 "Guarantor Rating": "A",
    //                 "Loan to Value Ratio": 0.83,
    //                 "Debt Service Coverage Ratio": 2.52,
    //                 "Total Assets": 133472482.2,
    //                 "Total Liabilities": 294279690.6,
    //                 "EBITDA": 70419654.54,
    //                 "Net Income": 4335752.01,
    //                 "Total Revenue": 391850032.4,
    //                 "Total Equity": 123734826.9,
    //                 "Cash Flow": 8270642.73,
    //                 "Interest Coverage Ratio": 3.86,
    //                 "Loan Default Probability": 0.28
    //             }
    //         },
    //         {
    //             "row_index": 5,
    //             "violations_data": {
    //                 "violations_data": [
    //                     {
    //                         "violation": "Customer ID: Invalid format (contains a decimal). Country: Invalid format (should be a 2-letter ISO code). Industry Code: Invalid format (should be a valid NAICS, SIC, or GICS code). Origination Date: Invalid format (should be yyyy-mm-dd). Interest Rate: Invalid format (should be a decimal). Credit Facility Type: Invalid value (should be one of the predefined codes). Credit Facility Purpose: Invalid value (should be one of the predefined codes). Collateral Type: Invalid value (should be one of the predefined codes). Syndicated Loan Flag: Invalid value (should be an integer). Disposition Flag: Invalid value (should be an integer).",
    //                         "remediation": "Customer ID: Remove the decimal and format as a string. Country: Correct to a valid 2-letter ISO code (e.g., IS -> ?). Industry Code: Validate against NAICS, SIC, or GICS code (e.g., if it's a NAICS, confirm it is within the valid range). Origination Date: Correct the date format to yyyy-mm-dd (e.g., 2023-08-31 -> 2023-08-31). Interest Rate: Convert to a decimal format (e.g., 0.1018). Credit Facility Type: Provide a valid integer value from the predefined codes. Credit Facility Purpose: Provide a valid integer value from the predefined codes. Collateral Type: Provide a valid integer value from the predefined codes. Syndicated Loan Flag: Provide a valid integer value from the predefined codes. Disposition Flag: Provide a valid integer value from the predefined codes."
    //                     }
    //                 ],
    //                 "violation_exists": true,
    //                 "risk_score": "90"
    //             },
    //             "row": {
    //                 "Customer ID": 82114400000000.0,
    //                 "Internal Obligor ID": "6185f8a7-1161-4807-81be-01d3e12de6e9",
    //                 "Obligor Name": "Perry Inc",
    //                 "City": "Martinfort",
    //                 "Country": "IS",
    //                 "Industry Code": 1022,
    //                 "Internal Risk Rating": "A",
    //                 "Taxpayer ID (TIN)": "395-40-9958",
    //                 "Stock Exchange": "NASDAQ",
    //                 "Ticker Symbol": "YUZ",
    //                 "CUSIP": "gkvikH",
    //                 "Internal Credit Facility ID": "9f25f5ef-eca1-41ed-9093-3fe8c43ec459",
    //                 "Origination Date": "31-08-2023",
    //                 "Maturity Date": "26-04-2027",
    //                 "Credit Facility Type": "Revolving",
    //                 "Credit Facility Purpose": "Refinancing",
    //                 "Loan Amount": 15850912.22,
    //                 "Outstanding Balance": 76069643.35,
    //                 "Interest Rate": 10.18,
    //                 "Collateral Type": "Real Estate",
    //                 "Loan Status": "Closed",
    //                 "Payment Frequency": "Monthly",
    //                 "Currency": "INR",
    //                 "Loan Grade": "CCC",
    //                 "Syndicated Loan Flag": "No",
    //                 "Disposition Flag": "Disposed",
    //                 "Guarantor ID": "288d2a87-d2f6-4bd5-8f63-56091b8a5e49",
    //                 "Guarantor Name": "Smith, Lewis and Contreras",
    //                 "Guarantor Rating": "B",
    //                 "Loan to Value Ratio": 0.73,
    //                 "Debt Service Coverage Ratio": 2.86,
    //                 "Total Assets": 395983983.0,
    //                 "Total Liabilities": 62424518.88,
    //                 "EBITDA": 80765395.66,
    //                 "Net Income": 38633214.12,
    //                 "Total Revenue": 357587093.0,
    //                 "Total Equity": 40729410.51,
    //                 "Cash Flow": 10211446.33,
    //                 "Interest Coverage Ratio": 9.37,
    //                 "Loan Default Probability": 0.17
    //             }
    //         },
    //         {
    //             "row_index": 6,
    //             "violations_data": {
    //                 "violations_data": [
    //                     {
    //                         "violation": "Customer ID: Invalid format (contains a decimal). Industry Code: Invalid format (should be a valid NAICS, SIC, or GICS code). Origination Date: Invalid format (should be yyyy-mm-dd). Interest Rate: Invalid format (should be a decimal). Credit Facility Type: Invalid value (should be one of the predefined codes). Credit Facility Purpose: Invalid value (should be one of the predefined codes). Collateral Type: Invalid value (should be one of the predefined codes). Syndicated Loan Flag: Invalid value (should be an integer). Disposition Flag: Invalid value (should be an integer).",
    //                         "remediation": "Customer ID: Remove the decimal and format as a string. Industry Code: Validate against NAICS, SIC, or GICS code (e.g., if it's a NAICS, confirm it is within the valid range). Origination Date: Correct the date format to yyyy-mm-dd (e.g., 2021-10-27 -> 2021-10-27). Interest Rate: Convert to a decimal format (e.g., 0.0512). Credit Facility Type: Provide a valid integer value from the predefined codes. Credit Facility Purpose: Provide a valid integer value from the predefined codes. Collateral Type: Provide a valid integer value from the predefined codes. Syndicated Loan Flag: Provide a valid integer value from the predefined codes. Disposition Flag: Provide a valid integer value from the predefined codes."
    //                     }
    //                 ],
    //                 "violation_exists": true,
    //                 "risk_score": "85"
    //             },
    //             "row": {
    //                 "Customer ID": 28345700000000.0,
    //                 "Internal Obligor ID": "3ce9f12c-8d8e-476f-a81a-23db1c0b5213",
    //                 "Obligor Name": "Martinez Ltd",
    //                 "City": "Michaelview",
    //                 "Country": "BA",
    //                 "Industry Code": 6197,
    //                 "Internal Risk Rating": "D",
    //                 "Taxpayer ID (TIN)": "418-76-6498",
    //                 "Stock Exchange": "LSE",
    //                 "Ticker Symbol": "hiq",
    //                 "CUSIP": "JtrGcv",
    //                 "Internal Credit Facility ID": "dd1633d7-0615-4304-964c-4545463a60ee",
    //                 "Origination Date": "27-10-2021",
    //                 "Maturity Date": "07-01-2035",
    //                 "Credit Facility Type": "Other",
    //                 "Credit Facility Purpose": "Working Capital",
    //                 "Loan Amount": 36787659.22,
    //                 "Outstanding Balance": 73539555.18,
    //                 "Interest Rate": 5.12,
    //                 "Collateral Type": "Equipment",
    //                 "Loan Status": "Active",
    //                 "Payment Frequency": "Annually",
    //                 "Currency": "INR",
    //                 "Loan Grade": "A",
    //                 "Syndicated Loan Flag": "Yes",
    //                 "Disposition Flag": "Retained",
    //                 "Guarantor ID": "df651fd3-6953-4d4f-8c73-bd161afa7b37",
    //                 "Guarantor Name": "Mendez, Collins and Nguyen",
    //                 "Guarantor Rating": "D",
    //                 "Loan to Value Ratio": 1.03,
    //                 "Debt Service Coverage Ratio": 1.22,
    //                 "Total Assets": 66196202.67,
    //                 "Total Liabilities": 355967893.0,
    //                 "EBITDA": 99485689.37,
    //                 "Net Income": 12237839.84,
    //                 "Total Revenue": 337813878.6,
    //                 "Total Equity": 78824972.5,
    //                 "Cash Flow": 13252269.4,
    //                 "Interest Coverage Ratio": 6.08,
    //                 "Loan Default Probability": 0.17
    //             }
    //         },
    //         {
    //             "row_index": 7,
    //             "violations_data": {
    //                 "violations_data": [
    //                     {
    //                         "violation": "Customer ID: Invalid format (contains a decimal). Interest Rate: Invalid format (should be a decimal). Collateral Type: Invalid value (should be an integer). Credit Facility Type: Invalid value (should be one of the predefined codes). Credit Facility Purpose: Invalid value (should be one of the predefined codes). Syndicated Loan Flag: Invalid value (should be an integer). Disposition Flag: Invalid value (should be an integer).",
    //                         "remediation": "Customer ID: Remove the decimal and format as a string. Interest Rate: Convert to a decimal format (e.g., 0.0655). Collateral Type: Provide a valid integer value from the predefined codes. Credit Facility Type: Provide a valid integer value from the predefined codes. Credit Facility Purpose: Provide a valid integer value from the predefined codes. Syndicated Loan Flag: Provide a valid integer value from the predefined codes. Disposition Flag: Provide a valid integer value from the predefined codes."
    //                     }
    //                 ],
    //                 "violation_exists": true,
    //                 "risk_score": "75"
    //             },
    //             "row": {
    //                 "Customer ID": 37629100000000.0,
    //                 "Internal Obligor ID": "dbb5bf9c-975c-4cf1-b493-cec80aa8c9dd",
    //                 "Obligor Name": "Davenport Inc",
    //                 "City": "Jonesburgh",
    //                 "Country": "BE",
    //                 "Industry Code": 7922,
    //                 "Internal Risk Rating": "D",
    //                 "Taxpayer ID (TIN)": "617-78-1101",
    //                 "Stock Exchange": "LSE",
    //                 "Ticker Symbol": "jdE",
    //                 "CUSIP": "YaJkhL",
    //                 "Internal Credit Facility ID": "b2aadd4b-f034-4936-b1bc-0bc077f57756",
    //                 "Origination Date": "16-06-2023",
    //                 "Maturity Date": "18-02-2030",
    //                 "Credit Facility Type": "Bridge Loan",
    //                 "Credit Facility Purpose": "Refinancing",
    //                 "Loan Amount": 98519519.33,
    //                 "Outstanding Balance": 83846458.68,
    //                 "Interest Rate": 6.55,
    //                 "Collateral Type": null,
    //                 "Loan Status": "Defaulted",
    //                 "Payment Frequency": "Annually",
    //                 "Currency": "GBP",
    //                 "Loan Grade": "BB",
    //                 "Syndicated Loan Flag": "No",
    //                 "Disposition Flag": "Disposed",
    //                 "Guarantor ID": "1f3c32ae-2419-4b6a-93b5-8078ef799d45",
    //                 "Guarantor Name": "Carey and Sons",
    //                 "Guarantor Rating": "B",
    //                 "Loan to Value Ratio": 1.08,
    //                 "Debt Service Coverage Ratio": 1.43,
    //                 "Total Assets": 58823388.81,
    //                 "Total Liabilities": 267077344.9,
    //                 "EBITDA": 30948149.11,
    //                 "Net Income": 1559826.73,
    //                 "Total Revenue": 309303560.0,
    //                 "Total Equity": 41207930.04,
    //                 "Cash Flow": 20248808.13,
    //                 "Interest Coverage Ratio": 3.24,
    //                 "Loan Default Probability": 0.26
    //             }
    //         },
    //         {
    //             "row_index": 8,
    //             "violations_data": {
    //                 "violations_data": [
    //                     {
    //                         "violation": "Customer ID: Invalid format (contains a decimal). Interest Rate: Invalid format (should be a decimal). Credit Facility Type: Invalid value (should be one of the predefined codes). Credit Facility Purpose: Invalid value (should be one of the predefined codes). Collateral Type: Invalid value (should be one of the predefined codes). Syndicated Loan Flag: Invalid value (should be an integer). Disposition Flag: Invalid value (should be an integer).",
    //                         "remediation": "Customer ID: Remove the decimal and format as a string. Interest Rate: Convert to a decimal format (e.g., 0.018). Credit Facility Type: Provide a valid integer value from the predefined codes. Credit Facility Purpose: Provide a valid integer value from the predefined codes. Collateral Type: Provide a valid integer value from the predefined codes. Syndicated Loan Flag: Provide a valid integer value from the predefined codes. Disposition Flag: Provide a valid integer value from the predefined codes."
    //                     }
    //                 ],
    //                 "violation_exists": true,
    //                 "risk_score": "75"
    //             },
    //             "row": {
    //                 "Customer ID": 97086000000000.0,
    //                 "Internal Obligor ID": "52a7b687-d225-4232-ae5a-eaaf8b8bad60",
    //                 "Obligor Name": "Little, Mckenzie and Peterson",
    //                 "City": "Lake Angelaburgh",
    //                 "Country": "ZA",
    //                 "Industry Code": 6692,
    //                 "Internal Risk Rating": "B",
    //                 "Taxpayer ID (TIN)": "386-70-8135",
    //                 "Stock Exchange": "NASDAQ",
    //                 "Ticker Symbol": "eig",
    //                 "CUSIP": "SLqEDn",
    //                 "Internal Credit Facility ID": "65fd3920-b8e5-43d0-8f37-e5f5f4c93c37",
    //                 "Origination Date": "09-02-2021",
    //                 "Maturity Date": "01-02-2033",
    //                 "Credit Facility Type": "Revolving",
    //                 "Credit Facility Purpose": "Working Capital",
    //                 "Loan Amount": 42032473.96,
    //                 "Outstanding Balance": 29561853.99,
    //                 "Interest Rate": 1.8,
    //                 "Collateral Type": "Inventory",
    //                 "Loan Status": "Active",
    //                 "Payment Frequency": "Quarterly",
    //                 "Currency": "USD",
    //                 "Loan Grade": "AAA",
    //                 "Syndicated Loan Flag": "Yes",
    //                 "Disposition Flag": "Disposed",
    //                 "Guarantor ID": "321b887d-cc20-413f-92eb-8908faa64961",
    //                 "Guarantor Name": "Ross, Sawyer and Yates",
    //                 "Guarantor Rating": "C",
    //                 "Loan to Value Ratio": 0.73,
    //                 "Debt Service Coverage Ratio": 2.94,
    //                 "Total Assets": 96668915.05,
    //                 "Total Liabilities": 111763464.7,
    //                 "EBITDA": 60854764.52,
    //                 "Net Income": 39425051.06,
    //                 "Total Revenue": 98905179.06,
    //                 "Total Equity": 130101544.2,
    //                 "Cash Flow": 26070243.6,
    //                 "Interest Coverage Ratio": 9.56,
    //                 "Loan Default Probability": 0.05
    //             }
    //         }
    //     ]
    
    //   )
    console.log("sending response");
    await axios.get("http://localhost:8000/getFlaggedCustomers").then((response) => {
        console.log(response.data);
        setAccordionItems(response.data.data);
        setLoading(false);
        setIsDataLoaded(true);
    }
    )
    console.log("response sent");
    } catch (error) {
      console.error("Error fetching data:", error);
    } finally {
      setLoading(false);
    }
  };

  const downloadExcel = async () => {
    try {
      const response = await axios.get("http://localhost:8000/downloadFlaggedFile", {
        responseType: "blob", // Ensure we get a binary blob
      });
  
      const blob = new Blob([response.data], {
        type: "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
      });
  
      const url = URL.createObjectURL(blob);
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "flagged_transactions.xlsx");
      document.body.appendChild(link);
      link.click();
  
      URL.revokeObjectURL(url);
      document.body.removeChild(link);
    } catch (error) {
      console.error("Error downloading file:", error);
      alert("Failed to download the file. Please try again.");
    }
  };

  const clearData = () => {
    setAccordionItems([]);
    setIsDataLoaded(false);
  };

  return (
    <Card sx={{  padding: 2 }}>
      {!isDataLoaded && (
        <Button onClick={fetchData} variant="contained" color="primary" disabled={loading}>
          {loading ? <CircularProgress size={24} /> : "Get Flagged Transactions"}
        </Button>
      )}
      {isDataLoaded && (
        <>
          <Button onClick={downloadExcel} variant="contained" color="success" sx={{ marginRight: 1 }}>
            Download Excel
          </Button>
          <Button onClick={clearData} variant="contained" color="error">
            Clear Data
          </Button>
        </>
      )}
      {accordionItems.map((item, index) => (
        <SingleFlagTranData key={index} rowIndex={index} row={item} />
      ))}
    </Card>
  );
}

export default AllFlaggedTranData;
