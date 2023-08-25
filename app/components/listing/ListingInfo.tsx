import React from "react";
import { BiChevronRight } from "react-icons/bi";

type Props = {
  description: string;
};

export default function ListingInfo({ description }: Props) {
  return (
    <div className="text-sm text-neutral-800 relative pb-5 ">
      <div className="line-clamp-5">
        {description} Lorem ipsum dolor sit amet consectetur adipisicing elit.
        Mollitia eos, aliquam eaque blanditiis doloribus hic saepe eum nihil
        dignissimos perferendis libero rerum unde alias ipsam delectus, quia
        minus, dicta assumenda? Obcaecati provident voluptatibus, voluptates
        inventore culpa laudantium perferendis aperiam maiores quidem quas
        necessitatibus doloribus facere odio libero placeat deleniti officia
        saepe! Fugit modi, obcaecati facere sunt quaerat rem magni expedita?
        Vitae aliquam quae, quisquam eum praesentium iste saepe accusantium
        quibusdam commodi quia, molestias sit earum cum. Odio excepturi aliquid
        ipsa neque sequi nostrum mollitia quaerat vel. Ducimus molestias
        repellat similique. Soluta vitae autem culpa cum numquam doloribus,
        aliquid quasi nobis alias aliquam laboriosam laborum similique saepe sit
        amet fugit aperiam inventore asperiores magnam deserunt. Earum
        consectetur soluta ex ipsam enim! Aspernatur, molestiae cum modi at
        magni quo enim porro eveniet odio non minima et animi neque, qui
        assumenda eligendi autem facere ratione blanditiis corporis ipsa ipsam
        dicta, eaque commodi. Unde? Similique tempora iste corrupti a nostrum
        quisquam sapiente totam laboriosam eum. Excepturi architecto inventore,
        natus eligendi nobis porro veritatis iure placeat fuga omnis
        exercitationem sint ipsa dolores asperiores eveniet amet. Quam optio
        tempora iste ea adipisci? Consequatur nisi repellat nemo, vel
        repellendus molestiae non numquam sit veritatis ipsum at voluptatibus
        tempore hic libero quos qui ratione aspernatur alias ipsam voluptatem.
        Sint, molestiae saepe voluptas, dicta placeat obcaecati aperiam ducimus
        modi ipsa suscipit accusamus odio velit deleniti. Possimus itaque
        aliquid iusto labore sit. Nesciunt, quibusdam saepe voluptatibus
        similique tempore quam quis. Rem sunt impedit deleniti fugit unde
        voluptas recusandae aspernatur atque blanditiis illo? Laboriosam
        nesciunt non commodi atque iure omnis cumque dicta blanditiis voluptate
        veritatis, sapiente nobis culpa odit aliquid vel? Qui temporibus et
        vero! Dignissimos aut optio, voluptates facilis doloremque, eos eum
        omnis laborum ipsa quo aperiam. Ipsam laudantium, porro magnam similique
        at repudiandae natus fugiat reiciendis a, voluptatibus perspiciatis.
      </div>
      <span
        onClick={() => {
          console.log("open modal to view the full description");
        }}
        className="absolute underline -bottom-3 flex gap-0 items-center cursor-pointer"
      >
        Show more <BiChevronRight size={25} />
      </span>
    </div>
  );
}
