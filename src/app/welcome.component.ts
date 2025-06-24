import { Component } from '@angular/core';

interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  voteCount: number;
  subredditId?: number;
}

interface Comment {
  id: number;
  postId: number;
  author: string;
  body: string;
  voteCount?: number;
}

interface Subreddit {
  id: number;
  name: string;
}

@Component({
  selector: 'app-welcome',
  templateUrl: './welcome.component.html',
  styleUrls: ['./welcome.component.css']
})
export class WelcomeComponent {
  posts: Post[] | null = null;
  allPosts: Post[] = [];
  comments: Comment[] = [];
  commentsByPost: { [postId: number]: Comment[] } = {};
  subreddits: Subreddit[] = [];
  selectedSubreddit: number | '' = '';
  error: string = '';
  activeCommentsPostId: number | null = null;

  constructor() {
    this.fetchSubreddits();
    this.fetchPosts();
    this.fetchComments();
  }

  fetchSubreddits() {
    fetch('http://[::1]:3000/subreddits')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch subreddits');
        return res.json();
      })
      .then(data => this.subreddits = data)
      .catch(() => {});
  }

  fetchPosts() {
    this.error = '';
    this.posts = null;
    fetch('http://[::1]:3000/posts')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch posts');
        return res.json();
      })
      .then(data => {
        this.allPosts = data;
        this.filterBySubreddit();
      })
      .catch(err => this.error = err.message || 'Failed to fetch posts');
  }

  filterBySubreddit() {
    if (!this.allPosts) return;
    let filtered: Post[];
    if (!this.selectedSubreddit) {
      filtered = this.allPosts;
    } else {
      filtered = this.allPosts.filter(p => p.subredditId === this.selectedSubreddit);
    }
    this.posts = filtered;
  }

  fetchComments() {
    fetch('http://[::1]:3000/comments')
      .then(res => {
        if (!res.ok) throw new Error('Failed to fetch comments');
        return res.json();
      })
      .then(data => {
        this.comments = data;
        this.commentsByPost = {};
        for (const comment of this.comments) {
          if (!this.commentsByPost[comment.postId]) {
            this.commentsByPost[comment.postId] = [];
          }
          this.commentsByPost[comment.postId].push(comment);
        }
      })
      .catch(() => {});
  }

  upvote(post: Post) {
    post.voteCount++;
    fetch(`http://[::1]:3000/posts/${post.id}`, {
      method: 'PATCH',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ voteCount: post.voteCount })
    }).catch(() => {});
  }

  downvote(post: Post) {
    post.voteCount--;
    // Optionally: send PATCH/POST to backend
  }

  openComments(post: Post) {
    this.activeCommentsPostId = post.id;
  }

  closeComments() {
    this.activeCommentsPostId = null;
  }
}
