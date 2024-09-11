import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

type CardDetails = {
  image: string,
  title: string,
  description: string
}

type MediaCardProps = {
  cardDetails: CardDetails
}

export default function MediaCard({ cardDetails }: MediaCardProps ) {
  return (
    <Card sx={{ maxWidth: 345, margin: 8 }}>
      <CardMedia
        sx={{ height: 140 }}
        image="/static/images/cards/contemplative-reptile.jpg"
        title="green iguana"
      />
      <CardContent>
        <Typography gutterBottom variant="h5" component="div">
        {cardDetails.title}
        </Typography>
        <Typography variant="body2" sx={{ color: 'text.secondary' }}>
          {cardDetails.description}
        </Typography>
      </CardContent>
      <CardActions>
        <Button size="small">Join Chat</Button>
        <Button size="small">Learn More</Button>
      </CardActions>
    </Card>
  );
}
