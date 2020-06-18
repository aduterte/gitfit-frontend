import React from "react"

export default function Footer(){
    return(
        <div id="footer-container">
            <div >
                <img className="footer-logo" src="/images/longlogogray.png" alt="footer logo"/>
            </div>
            <div className="footer-socials">
                <div>
                    <a href="https://github.com/aduterte">
                    <img className="footer-git" src="/images/github_PNG20.png" alt="github logo"/>
                    </a>
                </div>
                <div>
                    <a href="https://twitter.com/alessandro_du30">
                        <img className="footer-twitter" src="/images/twitterlogo.png" alt="github logo"/>
                    </a>
                </div>
                <div>
                    <a href="http://www.linkedin.com/in/alessandro-duterte">
                        <img className="footer-linked" src="/images/linkedin.png" alt="github logo"/>
                    </a>
                </div>
            </div>
        </div>
    )
}