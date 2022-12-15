import { useQuery } from "react-query";
import axios from "axios";
import { Box, CircularProgress, Typography } from "@mui/material";
import { useEffect } from "react";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import Link from "next/link";
import { motion } from "framer-motion";

export default function Home() {
  useEffect(() => {
    window.scrollTo(localStorage.getItem("x"), localStorage.getItem("y"));
  }, []);

  const { isLoading, error, data } = useQuery(
    "posts",
    () => {
      return axios.get("https://dummyjson.com/products?limit=84");
    },
    {
      staleTime: 300000,
      keepPreviousData: true,
    }
  );

  const handleNavigate = () => {
    localStorage.setItem("x", window.pageXOffset);
    localStorage.setItem("y", window.pageYOffset);
  };

  if (isLoading) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          width: "100%",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          height: "80vh",
          width: "100%",
        }}
      >
        <Typography>An error occured, please try again</Typography>
      </Box>
    );
  }

  return (
    <>
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          flexDirection: "column",
          width: "375px",
          margin: "auto",
        }}
      >
        <Box
          sx={{
            mt: "16px",
            mb: "16px",
            backgroundColor: "#262626",
            width: "100%",
            height: "24px",
            py: "24px",
            px: "12px",
            display: "flex",
            alignItems: "center",
            borderRadius: "14px",
          }}
        >
          <SearchRoundedIcon />
          <Typography sx={{ ml: "4px" }}>Search</Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            flexWrap: "wrap",
            flexDirection: "row",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          {data?.data?.products.map((product) => (
            <Link href={{ pathname: `posts`, query: { id: product?.id } }}>
              <motion.div
                layout
                whileTap={{ scale: 0.5 }}
                initial={{ opacity: 0, scale: 0.5 }}
                whileInView={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
              >
                <Box
                  onClick={() => {
                    handleNavigate();
                  }}
                >
                  <img
                    width={120}
                    height={120}
                    style={{
                      objectFit: "cover",
                      marginRight: "2px",
                      marginLeft: "2px",
                    }}
                    src={product?.images[0]}
                  />
                </Box>
              </motion.div>
            </Link>
          ))}
        </Box>
      </Box>
    </>
  );
}
