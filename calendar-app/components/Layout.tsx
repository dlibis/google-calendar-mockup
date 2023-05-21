import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/constants";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PropsWithChildren } from "react";
import AddIcon from "@mui/icons-material/Add";
import { MiniCalendar } from "@/components/MiniCalendar";

type Props = {};

const Layout: React.FC<PropsWithChildren> = ({ children }) => {
  return (
    <>
      <Navbar />
      <Box
        display={"flex"}
        sx={{
          "&>main": { flex: "1 1 auto" },
          minHeight: `calc(100vh - ${NAVBAR_HEIGHT})`,
          borderTop: "var(--hairline) 1px solid",
        }}
      >
        <aside>
          <Box
            mt={1.5}
            px={1}
            width={"256px"}
            display={"flex"}
            flexDirection={"column"}
          >
            <Box sx={{ height: "84pxs" }}>
              <Button
                variant="contained"
                color="info"
                startIcon={<AddIcon />}
                sx={{
                  fontWeight: "500",
                  height: "48px",
                  minWidth: "88px",
                  color: "#222",
                  backgroundColor: "transparent",
                  borderRadius: "48px",
                  "&:hover": {
                    transition:
                      "border .28s cubic-bezier(.4,0,.2,1),box-shadow .28s cubic-bezier(.4,0,.2,1)",
                    boxShadow:
                      "0px 4px 4px 0px rgba(60,64,67,0.3),0px 8px 12px 6px rgba(60,64,67,0.15)",
                    backgroundColor: "#f6fafe",
                  },
                }}
              >
                Create
              </Button>
            </Box>
            <MiniCalendar />
          </Box>
        </aside>
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
