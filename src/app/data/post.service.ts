import { Injectable } from '@angular/core';
import { HttpHeaders, HttpClient } from '@angular/common/http';
import { Observable, of } from 'rxjs';
import { tap, map, catchError } from 'rxjs/operators';
import { Post } from './post.model';
import { ConditionalExpr } from '@angular/compiler';

@Injectable({
  providedIn: 'root'
})
export class PostService {

  private postsUrl = 'api/posts';

  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(private http: HttpClient) { }

  getPosts(): Observable<Post[]> {
    return this.http.get<Post[]>(this.postsUrl).pipe(
      tap(_ => console.log('fetched posts')),
      catchError(this.handleError<Post[]>('getPosts', []))
    );
  }

  getPostNo404<data>(id: number): Observable<Post> {
    const url = `${this.postsUrl}/?id=${id}`;
    return this.http.get<Post[]>(url).pipe(
      map(posts => posts[0]),
      tap(p => {
        const outcome = p ? 'fetched' : 'did not fetched';
        console.log(`${outcome} post id=${id}`);
      }),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  getPost(id: number): Observable<Post> {
    const url = `${this.postsUrl}/${id}`;
    return this.http.get<Post>(url).pipe(
      tap(_=> console.log(`fetched post id=${id}`)),
      catchError(this.handleError<Post>(`getPost id=${id}`))
    );
  }

  addPost(post: Post): Observable<Post> {
    return this.http.post<Post>(this.postsUrl, post).pipe(
      tap((newPost: Post) => console.log(`added post w/ id=${newPost.id}`)),
      catchError(this.handleError<Post>('addPost'))
    );
  }

  deletePost(post: Post | number): Observable<any> {
    const id = typeof post === "number" ? post : post.id;
    const url = `${this.postsUrl}/${id}`;

    return this.http.delete<Post>(url, this.httpOptions).pipe(
      tap(_ => console.log(`deleted post id=${id}`)),
      catchError(this.handleError<Post>('deletePost'))
    );
  }

  updatePost(post: Post): Observable<Post> {
    return this.http.put(this.postsUrl, post, this.httpOptions).pipe(
      tap(_ => console.log(`updated post id=${post.id}`)),
      catchError(this.handleError<any>('updatePost'))
    );
  }




  private handleError<T>(operation = 'operations', result?: T) {
    return (error: any): Observable<T> => {
      console.error(error);
      console.log(`${operation} failed(error massage): ${error.message}`);
      return of(result as T);
    }
  }

}
