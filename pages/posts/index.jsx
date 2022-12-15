import React, { useEffect } from "react";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import { Avatar, Box, CircularProgress, Typography } from "@mui/material";
import { useRouter } from "next/router";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination } from "swiper";
import { useQuery } from "react-query";
import axios from "axios";
import FavoriteBorderRoundedIcon from "@mui/icons-material/FavoriteBorderRounded";
import ModeCommentOutlinedIcon from "@mui/icons-material/ModeCommentOutlined";
import { motion, AnimatePresence } from "framer-motion";
import ShareOutlinedIcon from "@mui/icons-material/ShareOutlined";
import LocalOfferOutlinedIcon from "@mui/icons-material/LocalOfferOutlined";
import StarRoundedIcon from "@mui/icons-material/StarRounded";
import Inventory2RoundedIcon from "@mui/icons-material/Inventory2Rounded";

const postId = () => {
  const router = useRouter();
  const productId = router.query.id;

  const { isLoading, error, data, refetch } = useQuery(
    "singlePost",
    () => {
      return axios.get(`https://dummyjson.com/products/${productId}`);
    },
    { cacheTime: 0, enabled: false }
  );

  useEffect(() => {
    if (productId !== undefined) {
      refetch();
    }
  }, [productId]);

  const handleBack = () => {
    router.push("/");
  };

  if (error) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          width: "100%",
          height: "100vh",
          alignItems: "center",
        }}
      >
        <Typography>An error happened, Please try again.</Typography>
      </Box>
    );
  }

  return isLoading ? (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        width: "100%",
        height: "100vh",
        alignItems: "center",
      }}
    >
      <CircularProgress />
    </Box>
  ) : (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0 }}
        key="modal"
        animate={{ opacity: 1 }}
        transition={{
          duration: 0.5,
          delay: 0.2,
        }}
        exit={{ opacity: 0 }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            flexDirection: "column",
            maxWidth: "500px",
            margin: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              width: "100%",
              mt: "16px",
            }}
          >
            <Box
              onClick={handleBack}
              sx={{ height: "24px", width: "24px", ml: "12px" }}
            >
              <ArrowBackIosRoundedIcon />
            </Box>

            <Typography>Explore</Typography>

            <MoreHorizRoundedIcon sx={{ mr: "12px" }} />
          </Box>

          <Box
            sx={{
              display: "flex",
              mt: "24px",
              alignItems: "start",
              flexDirection: "column",
            }}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  alignItems: "center",
                  mb: "24px",
                  ml: "12px",
                }}
              >
                <Avatar src={data?.data?.thumbnail} />

                <Typography sx={{ ml: "12px", fontWeight: "bold" }}>
                  {data?.data?.brand}
                </Typography>
              </Box>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.5 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{
                duration: 0.5,
                delay: 0.2,
                ease: [0, 0.71, 0.2, 1.01],
              }}
            >
              <Swiper
                pagination={{
                  dynamicBullets: true,
                }}
                modules={[Pagination]}
                className="mySwiper"
                style={{ width: "100vw", height: "500px", maxWidth: "500px" }}
              >
                {data?.data?.images?.map((image) => (
                  <SwiperSlide>
                    <img
                      style={{
                        objectFit: "cover",
                        width: "100%",
                        height: "500px",
                      }}
                      alt="meal"
                      src={image}
                    />
                  </SwiperSlide>
                ))}
              </Swiper>
            </motion.div>

            <Box>
              <Box sx={{ mt: "12px", ml: "8px" }}>
                <FavoriteBorderRoundedIcon sx={{ mr: "16px" }} />
                <ModeCommentOutlinedIcon sx={{ mr: "16px" }} />
                <ShareOutlinedIcon />
              </Box>
            </Box>
            <Typography sx={{ mt: "8px", ml: "12px", fontSize: "14px" }}>
              {data?.data?.id} likes
            </Typography>
            <Typography sx={{ mt: "8px", ml: "12px" }}>
              {data?.data?.title}
            </Typography>

            <Box sx={{ display: "flex" }}>
              <Box sx={{ mt: "12px", ml: "12px", display: "flex" }}>
                <LocalOfferOutlinedIcon />
                <Typography sx={{ ml: "4px" }}>${data?.data?.price}</Typography>
              </Box>

              <Box sx={{ mt: "12px", ml: "12px", display: "flex" }}>
                <StarRoundedIcon />
                <Typography sx={{ ml: "4px" }}>{data?.data?.rating}</Typography>
              </Box>

              {data?.data?.stock <= 20 && (
                <Box sx={{ mt: "12px", ml: "12px", display: "flex" }}>
                  <Inventory2RoundedIcon />
                  <Typography sx={{ ml: "4px" }}>
                    only {data?.data?.stock} left in stock
                  </Typography>
                </Box>
              )}
            </Box>

            <Box sx={{ mt: "28px", ml: "12px", mb: "24px", mr: "12px" }}>
              <Typography>{data?.data?.description}</Typography>
            </Box>
          </Box>
        </Box>
      </motion.div>
    </AnimatePresence>
  );
};

export default postId;
