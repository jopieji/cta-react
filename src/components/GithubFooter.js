import React from "react";
import { Typography } from "@material-ui/core";

function GithubFooter() {
    return (
        <div className="footer">
            <Typography
                variant="h6"
                style={{color: "grey" }}
            >
            Github: <a href="https://github.com/jopieji" target="_blank">jopieji</a>
            </Typography>
        </div>
        
    )
}

export default GithubFooter;