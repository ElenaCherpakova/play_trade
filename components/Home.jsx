// "use client";
// import React from "react";
// import { useRouter } from "next/navigation";
// import { Box, Button, Typography } from "@mui/material";
// //import RootLayout from "../app/layout";

// export default function Home() {
//   const router = useRouter();
//   return (
//     <>
//       <Box
//         height="100vh"
//         display="flex"
//         alignItems="center"
//         justifyContent="center"
//         onClick={() => router.push("/market")}
//         sx={{
//           "position": "relative",
//           "&::before": {
//             content: '""',
//             position: "absolute",
//             top: 0,
//             right: 0,
//             bottom: 0,
//             left: 0,
//             backgroundImage: "url(/landing_page.jpeg)",
//             backgroundSize: "contain",
//             backgroundPosition: "center",
//             backgroundRepeat: "no-repeat",
//             opacity: 0.7,
//             zIndex: -1
//           }
//         }}>
//           <Box
//         display="flex"
//         justifyContent="center"
//         alignItems="center"
//         height="50vh"
//         bgcolor="background.paper"
//       >
//         <p>Future paginatedcards will go here</p>
//         {/* Future cards will go here */}
//       </Box>
//         <Typography variant="h2" color="primary" gutterBottom></Typography>
//         <Button
//           variant="contained"
//           color="accent"
//           sx={{
//             "fontSize": {
//               xs: "1em", // font size for extra small screens
//               sm: "1.5em", // font size for small screens
//               md: "2em", // font size for medium screens
//               lg: "2.5em" // font size for large screens
//             },
//             "fontWeight": "bold",
//             "padding": {
//               xs: "1px 16px",
//               sm: "4px 24px",
//               md: "4px 32px",
//               lg: "6px 30px"
//             },
//             "letterSpacing": "3px",
//             "borderRadius": "20px",
//             "&:hover": {
//               backgroundColor: "white"
//               //color: theme.palette.error.main, // change the text color to alert on hover
//             }
//           }}>
//           START
//         </Button>
//       </Box>

//     </>
//   );
// }
"use client";
import React from "react";
import { useRouter } from "next/navigation";
import { Box, Button, Typography } from "@mui/material";

export default function Home() {
  const router = useRouter();
  return (
    <Box
      height="100vh"
      display="flex"
      flexDirection="column"
      justifyContent="space-between"
      onClick={() => router.push("/market")}
      sx={{
        "position": "relative",
        "&::before": {
          content: '""',
          position: "absolute",
          top: 0,
          right: 0,
          bottom: 0,
          left: 0,
          backgroundImage: "url(/landing_page.jpeg)",
          backgroundSize: "contain",
          backgroundPosition: "center",
          backgroundRepeat: "no-repeat",
          opacity: 0.7,
          zIndex: -1
        }
      }}>
      <Box
        display="flex"
        flexDirection="column"
        alignItems="center"
        justifyContent="center"
        flexGrow={1} //to make it take up all available space, pushing the second Box to the bottom.
      >
        <Typography variant="h2" color="primary" gutterBottom></Typography>
        <Button
          variant="contained"
          color="accent"
          sx={{
            "fontSize": {
              xs: "1em",
              sm: "1.5em",
              md: "2em",
              lg: "2.5em"
            },
            "fontWeight": "bold",
            "padding": {
              xs: "1px 16px",
              sm: "4px 24px",
              md: "4px 32px",
              lg: "6px 30px"
            },
            "letterSpacing": "3px",
            "borderRadius": "20px",
            "&:hover": {
              backgroundColor: "white"
            }
          }}>
          START
        </Button>
      </Box>
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height= "30vh"
        bgcolor="background.paper">
        <p>Future paginated cards will go here</p>
      </Box>
    </Box>
  );
}
