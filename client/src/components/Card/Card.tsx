import * as React from 'react';
import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { useRouter } from 'next/navigation'

type CardDetails = {
  image: string,
  title: string,
  description: string,
  path: string
}

type MediaCardProps = {
  cardDetails: CardDetails
}

export default function MediaCard({ cardDetails }: MediaCardProps, key: number ) {
  const router = useRouter()

  return (
    <Card key={key} sx={{ maxWidth: 345, margin: 8 }}>
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
        <Button onClick={() => router.push(cardDetails.path, { scroll: false })} size="small">Join Chat</Button>
        {/* <Button size="small">Learn More</Button> */}
      </CardActions>
    </Card>
  );
}
