import strings from "@/config/strings";
import { Link } from "react-router-dom";
import {
  Box,
  Typography,
  Container,
  Grid,
  IconButton,
  Link as MuiLink,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { Facebook, X, Instagram } from "@mui/icons-material";
import { ROUTES } from "../config/routes";

const Footer = () => {
  const theme = useTheme();

  return (
    <Box
      sx={{
        backgroundColor: "#f5f5f7",
        padding: 4,
        borderTop: `1px solid ${theme.palette.divider}`,
      }}
    >
      <Container maxWidth={false}>
        <Grid container spacing={4}>
          {/* Column 1 */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h5" gutterBottom>
              {strings.general.title}
            </Typography>
            <Typography variant="body2">{strings.footer.copyright}</Typography>
          </Grid>

          {/* Column 2 */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h5" gutterBottom>
              {strings.footer.about}
            </Typography>

            <Typography variant="body2" gutterBottom>
              <MuiLink
                component={Link}
                to={ROUTES.ABOUT_US}
                variant="body2"
              >
                {strings.aboutUs.helmet}
              </MuiLink>
            </Typography>

            <Typography variant="body2" gutterBottom>
              <MuiLink
                component={Link}
                to={ROUTES.FAQ}
                variant="body2"
              >
                {strings.faq.helmet}
              </MuiLink>
            </Typography>
          </Grid>

          {/* Column 3 */}
          <Grid item xs={12} sm={4} md={3}>
            <Typography variant="h5" gutterBottom>
              {strings.footer.like}
            </Typography>
            <Typography variant="body2" gutterBottom>
              <MuiLink
                component={Link}
                to={ROUTES.HELP}
                variant="body2"
              >
                {strings.footer.help}
              </MuiLink>
            </Typography>
          </Grid>

          {/* Column 4 */}
          <Grid item xs={12} sm={4} md={3}>
            <Box textAlign="center">
              <Typography variant="h5" gutterBottom>
                {strings.footer.connect}
              </Typography>
              <Typography variant="body2" gutterBottom>
                {strings.footer.email}
              </Typography>

              <Box sx={{ display: "flex", justifyContent: "center", gap: 1 }}>
                <IconButton
                  color="secondary"
                  component={Link}
                  to={ROUTES.FACEBOOK}
                  aria-label="Facebook"
                >
                  <Facebook />
                </IconButton>
                <IconButton
                  color="secondary"
                  component={Link}
                  to={ROUTES.INSTAGRAM}
                  aria-label="Instagram"
                >
                  <Instagram />
                </IconButton>
                <IconButton
                  color="secondary"
                  component={Link}
                  to={ROUTES.X}
                  aria-label="Twitter"
                >
                  <X />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
};

export default Footer;
