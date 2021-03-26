
import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';


@Entity()
export class Article extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  
  @Column()
  title: string;
  
  @Column()
  day: number;
  
  @Column()
  month: string;
  
  @Column()
  title_img: string;
  
  @Column()
  author_img: string;
  
  @Column()
  author_name: string;
  
  @Column()
  content: string;
  
  @Column()
  intro: string;
  
  @Column()
  clipboard_link: string;
  
  @Column()
  bg_title_1: string;
  
  @Column()
  bg_title_2: string;
  
  @Column()
  watched_times: number;
  
  @Column()
  hearts: number;
}
