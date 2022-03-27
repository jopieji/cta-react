import React from "react";
import { Typography } from "@material-ui/core";

function GithubFooter() {
    return (
        <div className="footer">
            <Typography
                variant="h6"
                style={{color: "red" }}
            >
            <a href="https://github.com/jopieji" target="_blank">Github</a>
            </Typography>
        </div>
        
    )
}

export default GithubFooter;