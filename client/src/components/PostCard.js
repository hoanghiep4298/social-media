import React from 'react'
import { Button, Card, Icon, Label, Image } from 'semantic-ui-react'
import moment from 'moment';

function PostCard({ post: { body, createdAt, id, username, likeCount, commentCount, likes } }) {
  return (
    <Card>
      <Card.Content>
        <Image
          floated='right'
          size='mini'
          src='https://react.semantic-ui.com/images/avatar/large/steve.jpg'
        />
        <Card.Header>{username}</Card.Header>
        <Card.Meta>{moment(createdAt).fromNow()}</Card.Meta>
        <Card.Description>
          {body}
        </Card.Description>
      </Card.Content>
      <Card.Content extra>
        <Button as='div' labelPosition='right'>
          <Button basic color='red'>
            <Icon name='heart' />
          </Button>
          <Label as='a' basic color='red' pointing='left'>
            {likeCount}
          </Label>
        </Button>
        <Button as='div' labelPosition='right'>
          <Button basic color='blue'>
            <Icon name='comment' />
          </Button>
          <Label as='a' basic color='blue' pointing='left'>
            {commentCount}
          </Label>
        </Button>
      </Card.Content>
    </Card>
  )
};

export default PostCard;