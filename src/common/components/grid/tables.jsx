import { Box, Chip, Typography } from "@mui/material";

import { useState } from "react";

export default function DataTables({
  data,
  perPage,
  setSelectedRows,
  pageVisited,
  total,
  selectedRows,
}) {
  const [selectAll, setSelectAll] = useState(false);

  const handleCheckboxChange = (id) => {
    if (selectedRows.includes(id)) {
      // If ID is already selected, remove it
      setSelectedRows(selectedRows.filter((selectedId) => selectedId !== id));
    } else {
      // If ID is not selected, add it
      setSelectedRows([...selectedRows, id]);
    }
  };

  const handleSelectAllChange = () => {
    if (selectAll) {
      // Deselect all if "Check All" is already checked
      setSelectedRows([]);
    } else {
      // Select all if "Check All" is not checked
      const allIds = data?.map((item) => item.id);
      setSelectedRows(allIds);
    }

    // Toggle the "Check All" state
    setSelectAll(!selectAll);
  };

  const renderStatus = {
    approved: <Chip label="Approved" color="success" variant="outlined" />,
    pending: <Chip label="Pending" color="info" variant="outlined" />,
    cancelled: <Chip label="Cancalled" color="secondary" variant="outlined" />,
  };

  const header = [
    {
      value: (
        <Box {...{ display: "flex", justifyContent: "start" }}>
          {" "}
          <input
            type="checkbox"
            id="checkbox-select-all"
            checked={selectAll}
            onChange={handleSelectAllChange}
          />
          <Typography {...{ fontWeight: 700 }}>ID</Typography>
        </Box>
      ),
      id: 0,
      width: 50,
      bgcolor: "primary.main",
    },
    {
      value: (
        <Box>
          <Typography {...{ fontWeight: 700 }}>EMAIL</Typography>
        </Box>
      ),
      id: 1,
      width: 400,
      bgcolor: "primary.main",
    },
    {
      value: (
        <Box>
          <Typography {...{ fontWeight: 700 }}>APPLICATION TYPE</Typography>
        </Box>
      ),
      id: 2,
      width: 250,
      bgcolor: "primary.main",
    },
    {
      value: (
        <Box>
          <Typography {...{ fontWeight: 700 }}>PAYMENT</Typography>
        </Box>
      ),
      id: 3,
      width: 200,
      bgcolor: "primary.main",
    },
    {
      value: (
        <Box>
          <Typography {...{ fontWeight: 700 }}>STATUS</Typography>
        </Box>
      ),
      id: 4,
      width: 200,
      bgcolor: "primary.main",
    },
  ];
  return (
    <Box>
      <Box {...{ fontWeight: 700, marginBottom: 1 }}>
        {pageVisited + 1} - {pageVisited + perPage} of {total}
      </Box>
      <Box
        {...{ display: "flex", justifyContent: "start", alignItems: "center" }}
      >
        {header.map((head) => (
          <Box
            key={head.id}
            {...{
              width: head.width,
              borderTop: "1px solid black",
              borderBottom: "1px solid black",
              padding: 1,
              color: "whitesmoke",
              fontWeight: 700,
              bgcolor: head.bgcolor,
            }}
          >
            {head.value}
          </Box>
        ))}
      </Box>
      <Box>
        {data?.map((rows) => (
          <Box
            {...{
              display: "flex",
              justifyContent: "start",
              alignItems: "center",
            }}
            key={rows.id}
          >
            <Box
              {...{
                width: 45,
                padding: "24px 10px",
                borderBottom: "1px solid black",
                fontWeight: 600,
              }}
            >
              <input
                type="checkbox"
                id={`checkbox-${rows.id}`}
                checked={selectedRows.includes(rows.id)}
                onChange={() => handleCheckboxChange(rows.id)}
              />
            </Box>
            <Box
              {...{
                width: 370,
                padding: "24px 10px",
                borderBottom: "1px solid black",
                fontWeight: 600,
              }}
            >
              {rows.email}
            </Box>
            <Box
              {...{
                width: 230,
                padding: "24px 0px 24px 30px",
                borderBottom: "1px solid black",
                fontWeight: 600,
              }}
              className="textUpperCase"
            >
              {rows.applicationType}
            </Box>
            <Box
              {...{
                width: 130,
                padding: "24px 0px 24px 40px",
                borderBottom: "1px solid black",
                fontWeight: 600,
              }}
              className="textUpperCase"
            >
              {rows.payment}
            </Box>
            <Box
              {...{
                width: 190,
                padding: "18px 20px 18px 80px",
                borderBottom: "1px solid black",
                fontWeight: 600,
              }}
              className="textUpperCase"
            >
              {renderStatus[rows.appStatus]}
            </Box>
          </Box>
        ))}
      </Box>
    </Box>
  );
}
