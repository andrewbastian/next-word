import React, { FC } from "react";
import styles from "../styles/LetterCard.module.css";
import { LetterCard } from "./LetterCard";
  
/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
interface WordProps {
  word: string;
}

/*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
export const Word: FC<WordProps> = ({ word }) => {
  /*~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~*/
  return (
    <div className={styles.gridDiv}>
      {[...word].map((e, i) => {
        return (
          <div key={`letterDiv${i}`} className={styles.grid}>
              <LetterCard key={e} letter={e} />
          </div>
        );
      })}
    </div>
  );
};
