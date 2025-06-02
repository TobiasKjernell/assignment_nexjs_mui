import { Box, CircularProgress, Paper } from "@mui/material";

const Loading = () => {
    return (
        <Box justifyContent={"center"} alignItems={'center'}  display={"flex"} width={"100%"} padding={5} color={'var(--primary)'}>
            <CircularProgress color="inherit" size={"50%"} />
        </Box>
    )
}
export default Loading;