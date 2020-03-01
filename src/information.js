import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';



export default function SimpleCard() {



    return (
        <Card >
            <CardContent>
                <Typography className="info" color="textSecondary" align-text="left" gutterBottom>
                    <h2>Information</h2>
                </Typography>
                <Typography className="info" variant="h5" component="h2">

                </Typography>

                <Typography className="info" variant="body2" component="p">
                    <h5>Create a shortcut to your home screen</h5>

                    <ul>
                        <p className="bullet-title">On Android and iPhone</p>
                        <li>Whilst on Team tables - Go to "Create Bookmark"</li>
                        <li>Scroll down to find "add to Homescreen"</li>
                        <li>This will create an icon on your phone that you can use to access the app without having to enter the web address </li>
                    </ul>


                </Typography>
            </CardContent>
            <CardActions>
                <Button size="small" href="https://dt-app-up.azurewebsites.net">Back to Tables</Button>
            </CardActions>
        </Card>
    );
}
