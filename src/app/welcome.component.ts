import { Component } from '@angular/core';

interface Post {
  id: number;
  title: string;
  body: string;
  author: string;
  score: number;
  subredditId?: number;
}

interface Comment {
  id: number;
  postId: number;
  author: string;
  body: string;
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
    if (!this.selectedSubreddit) {
      this.posts = this.allPosts;
    } else {
      this.posts = this.allPosts.filter(p => p.subredditId === this.selectedSubreddit);
    }
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
    post.score++;
    // Optionally: send PATCH/POST to backend
  }

  downvote(post: Post) {
    post.score--;
    // Optionally: send PATCH/POST to backend
  }
}
