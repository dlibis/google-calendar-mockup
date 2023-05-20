import Navbar from "@/components/Navbar";
import { NAVBAR_HEIGHT } from "@/constants";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import { PropsWithChildren } from "react";
import AddIcon from "@mui/icons-material/Add";

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
          <Box mt={1.5} px={1} width={"256px"}>
            <Button variant="contained" color="info" startIcon={<AddIcon />}>
              Create
            </Button>
          </Box>
        </aside>
        <main>{children}</main>
      </Box>
    </>
  );
};

export default Layout;
