import { View, Text, StyleSheet, Image, TouchableOpacity } from 'react-native'
import React from 'react'
import { Divider } from 'react-native-elements'

const postFooterIcons = [
  {
    name: 'Like',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/like--v1.png',
    likedImageUrl: 'https://img.icons8.com/color/48/000000/like--v1.png',
  },
  {
    name: 'Comment',
    imageUrl: 'https://img.icons8.com/ios-glyphs/60/ffffff/topic.png',
  },
  {
    name: 'Share',
    // image url for paper plane
    imageUrl: 'https://img.icons8.com/ios-glyphs/60/ffffff/paper-plane.png',
  },
  {
    name: 'Save',
    imageUrl: 'https://img.icons8.com/fluency-systems-regular/60/ffffff/bookmark-ribbon.png',
  },
]

const Post = ({ post }) => {
  return (
    <View style={{ marginBottom: 30 }}>
      <Divider width={1} orientation="vertical" />
      <PostHeader post={post} />
      <PostImage post={post} />
      <View style={{ marginHorizontal: 15, marginTop: 10 }}>
        <PostFooter />
        <Likes post={post} />
        <Caption post={post} />
        <CommentsSection post={post} />
        <Comments post={post} />
      </View>
    </View>
  )
}

const PostHeader = ({ post }) => (
  <View
    style={{
      flexDirection: 'row',
      justifyContent: 'space-between',
      margin: 5,
      alignItems: 'center'
    }}
  >
    <View style={{ flexDirection: 'row', alignItems: 'center' }}>
      <Image source={{ uri: post.profile_picture }} style={styles.story} />
      <Text style={{ color: 'white', marginLeft: 5, fontWeight: '700' }}>
        {post.user}
      </Text>
    </View>

    <Text style={{ color: 'white', fontWeight: '900' }}>...</Text>
  </View>
)

const PostImage = ({ post }) => (
  <View style={{ width: '100%', height: 450 }}>
    <Image
      source={{ uri: post.imageUrl }}
      style={{ width: '100%', resizeMode: 'cover' }}
    />
  </View>
)

const PostFooter = () => (
  <View style={{ flexDirection: 'row' }}>
    <View style={styles.leftFooterIconsContainer}>
      <Icon imageStyle={styles.footerIcon} imageUrl={postFooterIcons[0].imageUrl} />
      <Icon imageStyle={styles.footerIcon} imageUrl={postFooterIcons[1].imageUrl} />
      <Icon
        imageStyle={[styles.footerIcon, styles.shareIcon]}
        imageUrl={postFooterIcons[2].imageUrl}
      />
    </View>

    <View style={{ flex: 1, alignItems: 'flex-end' }}>
      <Icon imageStyle={styles.footerIcon} imageUrl={postFooterIcons[3].imageUrl} />
    </View>
  </View>
)

const Icon = ({ imageStyle, imageUrl }) => (
  <TouchableOpacity>
    <Image style={imageStyle} source={{ uri: imageUrl }} />
  </TouchableOpacity>
)

const Likes = ({ post }) => (
  <View style={{ flexDirection: 'row', marginTop: 4 }}>
    <Text style={{ color: 'white', fontWeight: '600' }}>
      {post.likes.toLocaleString('en')} likes
    </Text>
  </View>
)

const Caption = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    <Text style={{ color: 'white' }}>
      <Text style={{ fontWeight: '600' }}>{post.user}</Text>
      <Text> {post.caption}</Text>
    </Text>
  </View>

)

const CommentsSection = ({ post }) => (
  <View style={{ marginTop: 5 }}>
    {!!post.comments.length && (
      <Text style={{ color: 'gray' }}>
        {post.comments.length > 1 ? 'View all ' + post.comments.length + ' comments' : 'View 1 comment'}
      </Text>
    )}
  </View>
)

const Comments = ({ post }) => (
  <>
    {post.comments.map((comment, index) => (
      <View key={index} style={{ flexDirection: 'row', marginTop: 5 }}>
        <Text style={{ color: 'white' }}>
          <Text style={{ fontWeight: '600' }}>{comment.user}</Text>{' '}
          {comment.comment}
        </Text>
      </View>
    ))}
  </>
)

const styles = StyleSheet.create({
  story: {
    width: 35,
    height: 35,
    borderRadius: 50,
    marginLeft: 6,
    borderWidth: 1.6,
    borderColor: '#ff8501',
  },

  footerIcon: {
    width: 33,
    height: 33,
  },

  shareIcon: {
    transform: [{ rotate: '320deg' }],
    marginTop: -3,
  },

  leftFooterIconsContainer: {
    flexDirection: 'row',
    width: '32%',
    justifyContent: 'space-between',
  },
})
export default Post
