"use client"
import { Button, Link, Typography, Grid, Box } from "@mui/material";
import Image from "next/image";
import { theme } from "@/styles/theme";

const Custom404 = () => {
    return (
        <Grid container spacing={4} justifyContent="center" alignItems="center" textAlign="left">
            <Grid item xs={12} sm={6}>
                <Box width={300} marginBottom={theme.spacing(2)} marginLeft={theme.spacing(4)}>
                    <Typography variant="h1">404 - Page Not Found</Typography>
                </Box>
                <Box width={520} marginBottom={theme.spacing(2)} marginLeft={theme.spacing(4)}>
                    <Typography variant="body1">
                        It looks like you've taken a wrong turn. The page you are looking for does not exist. Don't worry,
                        let's get you back on track!.
                    </Typography>
                </Box>
                <Box width={300} marginLeft={theme.spacing(4)}>
                    <Link href="/" passHref>
                        <Button variant="contained" color="accent" style={{ color: theme.palette.background.paper }}>
                            Back To Home
                        </Button>
                    </Link>
                </Box>
            </Grid>
            <Grid item xs={12} sm={6}>
                <Image src="/images/404page.svg" alt="404 Not Found" width={600} height={400} />
            </Grid>
        </Grid>
    );
};

export default Custom404;
