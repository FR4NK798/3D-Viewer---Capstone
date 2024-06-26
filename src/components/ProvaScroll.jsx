import { useRef, useEffect } from "react";
import React, { forwardRef } from "react";

const ProvaScroll = () => {
  const scrollProva = useRef(0);
  const caption = useRef();

  useEffect(() => {
    console.log("scroll", scrollProva);
  }, [scrollProva]);

  console.log("event", Event);

  return (
    <div>
      Lorem idivsum dolor sit amet consectetur adipisicing elit. Culpa porro
      expedita necessitatibus soluta dolor quae dolore ad pariatur adipisci
      tempore non, odit, ea officiis vero veritatis eveniet atque, dolores
      molestias! Sit eveniet possimus ex iure ea, quibusdam tenetur deserunt
      numquam aperiam esse neque optio quisquam rerum fugit animi accusamus sunt
      dicta rem odio! Dolor doloremque deleniti eius sapiente in eaque. Magnam,
      animi excepturi necessitatibus sequi ex ullam tenetur consequatur!
      Blanditiis illo libero fugiat doloribus, beatae vitae esse velit vel vero
      nam, quae tempora aut natus minima obcaecati dolor numquam doloremque?
      Iure nulla eos optio. Rerum dicta amet consequatur nisi ullam, qui
      delectus provident perferendis nihil reprehenderit! Error, dolore
      accusantium voluptate impedit minus praesentium corporis pariatur
      voluptates unde, magnam cupiditate culpa. Placeat, voluptatibus quod?
      Reiciendis consequuntur ab ipsa error cum, corporis distinctio aliquid.
      Quo perspiciatis similique animi labore accusantium alias obcaecati
      voluptatum itaque fuga et ratione eligendi beatae, ipsam hic repudiandae.
      Numquam neque dignissimos, minima, saepe amet quo, consequuntur iusto
      ipsam ratione ut tempora aliquid. Culpa ratione, provident tempora modi
      recusandae totam. Enim ducimus numquam modi veritatis fugit id dolorem. A.
      Pariatur fugit dolor veritatis, animi iure atque quos aspernatur rem quasi
      quibusdam, reiciendis voluptas at, distinctio eum sit? Autem voluptates
      iste commodi suscipit quaerat quidem accusantium quod. Expedita, esse
      itaque? Commodi debitis ipsa autem incidunt sequi. Vero voluptatem neque
      impedit repudiandae recusandae voluptas temporibus odit, soluta optio a!
      Quis quisquam est facere eius labore quo. Labore ex qui eaque expedita?
      Reprehenderit nihil itaque cupiditate esse similique quia est maxime
      aperiam sit sed quasi dolor recusandae, optio veniam explicabo doloremque
      quibusdam corporis ex quis officiis corrupti. Inventore rem necessitatibus
      quibusdam unde? Nostrum eos sit eaque iure ipsa vitae, debitis incidunt ab
      doloremque inventore laborum iusto quam nam nesciunt commodi quisquam
      ipsam repudiandae ipsum excepturi enim laboriosam! Quo error saepe
      laudantium illo?
      <div
        onScroll={(e) => {
          scrollProva.current =
            e.target.scrollTop / (e.target.scrollHeight - window.innerHeight);

          console.log("on scroll");
          console.log("event", e.target.className);
          console.log("e.target.scrollTop", e.target.scrollTop);
          console.log("e.target.scrollHeight", e.target.scrollHeight);
          console.log("window.innerHeight", window.innerHeight);
          console.log(
            "scroll.current.toFixed(2)",
            scrollProva.current.toFixed(2)
          );
          console.log("scroll", scrollProva);
          if (e.target.scrollHeight - e.target.scrollTop === 100) {
            console.log("fine scroll");
            e.target.className = "stop";
            console.log("nome classe", e.target.className);
          } else {
            console.log("ancora non finito");
            console.log("nome classe", e.target.className);
          }
        }}
        className="provascroll"
      >
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Facilis dolorem
        ratione unde dolore exercitationem quidem cum, iusto itaque libero
        tempora? Aperiam voluptatum dolor officiis ipsam? Hic magnam neque enim
        vero. Eveniet dolores, a atque, facere, maiores ea quaerat odio totam
        ipsa accusantium odit illo vitae assumenda ducimus sapiente sint dicta
        ipsum in ab libero architecto? Totam et exercitationem sequi quibusdam!
        Itaque dicta officia voluptate dolore suscipit, corporis laudantium
        pariatur est omnis saepe optio deleniti beatae, molestiae earum laborum
        amet dolor eum quia porro reprehenderit sed neque? Consequatur provident
        officia ea. Cum iusto voluptas dolorem placeat, ad ab facilis
        consequuntur nesciunt. Reprehenderit esse obcaecati, nam dignissimos
        officiis veritatis quia! Consectetur ullam dolorem blanditiis recusandae
        officia alias ratione vero quis libero. Magni. Nesciunt repellat,
        deserunt a porro voluptate, sit quos aliquid soluta non eius accusantium
        nam natus sunt. Ipsa, quibusdam accusantium. Accusamus aspernatur
        officia quos accusantium sint ut assumenda fuga sequi blanditiis? Omnis
        inventore, aliquam reiciendis soluta dolorem atque facilis consectetur
        earum, laboriosam saepe qui hic quae vero. Non, placeat animi molestias
        eum error autem beatae sapiente rem. Voluptates tenetur veniam eveniet!
        Laborum asperiores excepturi minus eaque pariatur adipisci ipsam
        incidunt officiis a maiores commodi veritatis, quis temporibus? Fugit,
        excepturi. Sunt inventore, nam unde ullam error nemo deserunt. Voluptas
        pariatur quibusdam non. Nisi illum ut sunt, sequi numquam eveniet
        aliquam rerum vitae totam iste ipsum suscipit cum recusandae, omnis
        consequatur. Odit ea dignissimos repellendus quibusdam, aut esse
        pariatur quisquam recusandae voluptate at. Perspiciatis iure a alias
        distinctio adipisci placeat facere, consequuntur, deleniti soluta
        praesentium ullam minima suscipit dolore voluptates, nesciunt autem iste
        id cumque. Alias, similique? Itaque saepe eveniet quod harum tempora.
        Optio tempora tenetur libero itaque est quidem eligendi, nesciunt
        explicabo repellat minus molestiae reprehenderit laboriosam, saepe velit
        ab voluptatem. Officiis adipisci numquam ratione alias sunt et.
        Quibusdam laborum corporis repellat.
      </div>
      Lorem ipsum dolor sit amet consectetur adipisicing elit. Dignissimos
      fugiat nisi, sequi, sunt cum facere animi ex totam atque laborum
      voluptatem quas delectus. Quia, commodi magnam. Incidunt animi dolore
      omnis! Dolore maiores aspernatur similique repellendus iste, eligendi
      libero. Nam, neque placeat porro officiis quos repellat fugiat perferendis
      quia illum corporis soluta voluptates. Molestiae voluptate ipsa quisquam
      eveniet voluptas voluptates vitae! Asperiores necessitatibus blanditiis
      illum accusantium ab repellat. Recusandae natus ad non, eius aliquam
      ducimus quidem, maxime nostrum quaerat est omnis unde quod nulla
      distinctio laborum adipisci labore quae velit nam. Neque incidunt impedit
      voluptatum voluptates officiis, minus eveniet ipsum labore dolor non magni
      ducimus dignissimos velit. Voluptatem, placeat maxime, quia, aperiam
      cumque iusto odit odio expedita ex earum et aspernatur? Labore beatae
      cupiditate est quam deleniti asperiores excepturi facere similique sint
      repellat veritatis doloremque mollitia ut aperiam omnis id, dolorem, quasi
      iusto dicta. Voluptatem quas fuga, facere ducimus hic natus. Aliquam
      laboriosam illo, architecto qui sequi sunt. Ipsam, optio porro. Officia
      corrupti, asperiores nulla atque minus esse consequatur nostrum quasi
      culpa eveniet facere optio tempore nisi natus temporibus voluptatum quas.
      Adipisci ea corporis nulla itaque a, aperiam praesentium totam tenetur quo
      illo inventore similique modi facere tempora quia dolor consequatur
      molestias. Provident maxime magnam accusamus tempora, dolorem dolorum
      blanditiis cumque. Iusto libero maiores vero animi commodi ipsa,
      repellendus, quo officiis odio, amet molestias ipsum velit porro? Suscipit
      consectetur eius reiciendis laudantium veritatis mollitia architecto,
      pariatur fuga ut in, distinctio aut. Veritatis quibusdam unde error a
      repellat dignissimos iste eaque dolorem officiis harum provident enim et
      cum illo eum accusantium, quam facere mollitia illum officia possimus id.
      Atque ea omnis labore. Saepe ipsa architecto est. Sequi nam dolorem
      reprehenderit mollitia nihil? Voluptatibus aut doloribus cupiditate
      reiciendis, earum, at dolore illo odio sunt in velit aliquam, natus cum
      impedit maiores libero adipisci!
    </div>
  );
};

export default ProvaScroll;
