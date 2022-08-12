import { WinnerChecker } from '../';
import { BoundaryMarker } from '../../BoundaryMarker';
import { Card } from '../../Card';
import { STGame } from '../../SchottenTottenGame';

describe('Component WinnerChecker', () => {
  describe('Given a boundary markers list', () => {
    const marker1 = new BoundaryMarker();
    const marker2 = new BoundaryMarker();
    const marker3 = new BoundaryMarker();
    const marker4 = new BoundaryMarker();
    const marker5 = new BoundaryMarker();
    const marker6 = new BoundaryMarker();
    const marker7 = new BoundaryMarker();
    const marker8 = new BoundaryMarker();
    const marker9 = new BoundaryMarker();

    marker1.addCard(STGame.PLAYER_1, new Card(1, 'blue'));
    marker1.addCard(STGame.PLAYER_1, new Card(2, 'blue'));
    marker1.addCard(STGame.PLAYER_1, new Card(3, 'blue'));
    marker1.addCard(STGame.PLAYER_2, new Card(4, 'blue'));
    marker1.addCard(STGame.PLAYER_2, new Card(5, 'blue'));
    marker1.addCard(STGame.PLAYER_2, new Card(6, 'blue')); // 2 Wins
    marker1.claim();

    marker2.addCard(STGame.PLAYER_1, new Card(7, 'blue'));
    marker2.addCard(STGame.PLAYER_1, new Card(8, 'blue'));
    marker2.addCard(STGame.PLAYER_1, new Card(9, 'blue'));
    marker2.addCard(STGame.PLAYER_2, new Card(1, 'purple'));
    marker2.addCard(STGame.PLAYER_2, new Card(2, 'purple'));
    marker2.addCard(STGame.PLAYER_2, new Card(3, 'purple')); // 1 Wins
    marker2.claim();

    marker3.addCard(STGame.PLAYER_1, new Card(4, 'purple'));
    marker3.addCard(STGame.PLAYER_1, new Card(5, 'purple'));
    marker3.addCard(STGame.PLAYER_1, new Card(6, 'purple'));
    marker3.addCard(STGame.PLAYER_2, new Card(7, 'purple'));
    marker3.addCard(STGame.PLAYER_2, new Card(8, 'purple'));
    marker3.addCard(STGame.PLAYER_2, new Card(9, 'purple')); // 2 Wins
    marker3.claim();

    marker4.addCard(STGame.PLAYER_1, new Card(1, 'brown'));
    marker4.addCard(STGame.PLAYER_1, new Card(2, 'brown'));
    marker4.addCard(STGame.PLAYER_1, new Card(3, 'brown'));
    marker4.addCard(STGame.PLAYER_2, new Card(4, 'brown'));
    marker4.addCard(STGame.PLAYER_2, new Card(5, 'brown'));
    marker4.addCard(STGame.PLAYER_2, new Card(6, 'brown')); // 2 Wins
    marker4.claim();

    marker5.addCard(STGame.PLAYER_1, new Card(7, 'brown'));
    marker5.addCard(STGame.PLAYER_1, new Card(8, 'brown'));
    marker5.addCard(STGame.PLAYER_1, new Card(9, 'brown'));
    marker5.addCard(STGame.PLAYER_2, new Card(1, 'green'));
    marker5.addCard(STGame.PLAYER_2, new Card(2, 'green'));
    marker5.addCard(STGame.PLAYER_2, new Card(3, 'green')); // 1 Wins
    marker5.claim();

    marker6.addCard(STGame.PLAYER_1, new Card(4, 'green'));
    marker6.addCard(STGame.PLAYER_1, new Card(5, 'green'));
    marker6.addCard(STGame.PLAYER_1, new Card(6, 'green'));
    marker6.addCard(STGame.PLAYER_2, new Card(7, 'green'));
    marker6.addCard(STGame.PLAYER_2, new Card(8, 'green'));
    marker6.addCard(STGame.PLAYER_2, new Card(9, 'green')); // 2 Wins
    marker6.claim();

    marker7.addCard(STGame.PLAYER_1, new Card(1, 'orange'));
    marker7.addCard(STGame.PLAYER_1, new Card(2, 'orange'));
    marker7.addCard(STGame.PLAYER_1, new Card(3, 'orange'));
    marker7.addCard(STGame.PLAYER_2, new Card(4, 'orange'));
    marker7.addCard(STGame.PLAYER_2, new Card(5, 'orange'));
    marker7.addCard(STGame.PLAYER_2, new Card(6, 'orange')); // 2 Wins
    marker7.claim();

    marker8.addCard(STGame.PLAYER_1, new Card(7, 'orange'));
    marker8.addCard(STGame.PLAYER_1, new Card(8, 'orange'));
    marker8.addCard(STGame.PLAYER_1, new Card(9, 'orange'));
    marker8.addCard(STGame.PLAYER_2, new Card(1, 'yellow'));
    marker8.addCard(STGame.PLAYER_2, new Card(2, 'yellow'));
    marker8.addCard(STGame.PLAYER_2, new Card(3, 'yellow')); // 1 Wins
    marker8.claim();

    marker9.addCard(STGame.PLAYER_1, new Card(4, 'yellow'));
    marker9.addCard(STGame.PLAYER_1, new Card(5, 'yellow'));
    marker9.addCard(STGame.PLAYER_1, new Card(6, 'yellow'));
    marker9.addCard(STGame.PLAYER_2, new Card(7, 'yellow'));
    marker9.addCard(STGame.PLAYER_2, new Card(8, 'yellow'));
    marker9.addCard(STGame.PLAYER_2, new Card(9, 'yellow')); // 2 Wins
    marker9.claim();

    describe('With player 2 owning 6 markers', () => {
      describe('When I check if there is a winner', () => {
        const winner = WinnerChecker.isThereAWinner([
          marker1,
          marker2,
          marker3,
          marker4,
          marker5,
          marker6,
          marker7,
          marker8,
          marker9,
        ]);

        it('Then player 2 is the winner', () => {
          expect(winner).toStrictEqual(STGame.PLAYER_2);
        });
      });
    });
  });

  describe('Given a boundary markers list', () => {
    const marker1 = new BoundaryMarker();
    const marker2 = new BoundaryMarker();
    const marker3 = new BoundaryMarker();
    const marker4 = new BoundaryMarker();
    const marker5 = new BoundaryMarker();
    const marker6 = new BoundaryMarker();
    const marker7 = new BoundaryMarker();
    const marker8 = new BoundaryMarker();
    const marker9 = new BoundaryMarker();

    marker1.addCard(STGame.PLAYER_2, new Card(1, 'blue'));
    marker1.addCard(STGame.PLAYER_2, new Card(2, 'blue'));
    marker1.addCard(STGame.PLAYER_2, new Card(3, 'blue'));
    marker1.addCard(STGame.PLAYER_1, new Card(4, 'blue'));
    marker1.addCard(STGame.PLAYER_1, new Card(5, 'blue'));
    marker1.addCard(STGame.PLAYER_1, new Card(6, 'blue')); // 1 Wins
    marker1.claim();

    marker2.addCard(STGame.PLAYER_2, new Card(7, 'blue'));
    marker2.addCard(STGame.PLAYER_2, new Card(8, 'green'));
    marker2.addCard(STGame.PLAYER_2, new Card(9, 'blue'));
    marker2.addCard(STGame.PLAYER_1, new Card(1, 'purple'));
    marker2.addCard(STGame.PLAYER_1, new Card(2, 'purple'));
    marker2.addCard(STGame.PLAYER_1, new Card(3, 'purple')); // 1 Wins
    marker2.claim();

    marker3.addCard(STGame.PLAYER_2, new Card(4, 'purple'));
    marker3.addCard(STGame.PLAYER_2, new Card(4, 'yellow'));
    marker3.addCard(STGame.PLAYER_2, new Card(4, 'green'));
    marker3.addCard(STGame.PLAYER_1, new Card(7, 'purple'));
    marker3.addCard(STGame.PLAYER_1, new Card(8, 'purple'));
    marker3.addCard(STGame.PLAYER_1, new Card(9, 'purple')); // 1 Wins
    marker3.claim();

    describe('With player 1 owning 3 consecutive markers', () => {
      describe('When I check if there is a winner', () => {
        const winner = WinnerChecker.isThereAWinner([
          marker1,
          marker2,
          marker3,
          marker4,
          marker5,
          marker6,
          marker7,
          marker8,
          marker9,
        ]);

        it('Then player 1 is the winner', () => {
          expect(winner).toStrictEqual(STGame.PLAYER_1);
        });
      });
    });
  });

  describe('Given a boundary markers list', () => {
    const marker1 = new BoundaryMarker();
    const marker2 = new BoundaryMarker();
    const marker3 = new BoundaryMarker();
    const marker4 = new BoundaryMarker();
    const marker5 = new BoundaryMarker();
    const marker6 = new BoundaryMarker();
    const marker7 = new BoundaryMarker();
    const marker8 = new BoundaryMarker();
    const marker9 = new BoundaryMarker();

    marker1.addCard(STGame.PLAYER_2, new Card(1, 'blue'));
    marker1.addCard(STGame.PLAYER_2, new Card(2, 'blue'));
    marker1.addCard(STGame.PLAYER_2, new Card(3, 'blue'));
    marker1.addCard(STGame.PLAYER_1, new Card(4, 'blue'));
    marker1.addCard(STGame.PLAYER_1, new Card(5, 'blue'));
    marker1.addCard(STGame.PLAYER_1, new Card(6, 'blue')); // 1 Wins
    marker1.claim();

    marker2.addCard(STGame.PLAYER_2, new Card(7, 'blue'));
    marker2.addCard(STGame.PLAYER_2, new Card(8, 'green'));
    marker2.addCard(STGame.PLAYER_2, new Card(9, 'blue'));
    marker2.addCard(STGame.PLAYER_1, new Card(1, 'purple'));
    marker2.addCard(STGame.PLAYER_1, new Card(2, 'purple'));
    marker2.addCard(STGame.PLAYER_1, new Card(3, 'purple')); // 1 Wins
    marker2.claim();

    marker3.addCard(STGame.PLAYER_2, new Card(4, 'purple'));
    marker3.addCard(STGame.PLAYER_2, new Card(4, 'yellow'));
    marker3.addCard(STGame.PLAYER_2, new Card(4, 'green'));
    marker3.addCard(STGame.PLAYER_1, new Card(1, 'purple'));
    marker3.addCard(STGame.PLAYER_1, new Card(1, 'blue'));
    marker3.addCard(STGame.PLAYER_1, new Card(1, 'green')); // 2 Wins
    marker3.claim();

    describe('With no winner', () => {
      describe('When I check if there is a winner', () => {
        const winner = WinnerChecker.isThereAWinner([
          marker1,
          marker2,
          marker3,
          marker4,
          marker5,
          marker6,
          marker7,
          marker8,
          marker9,
        ]);

        it('Then nobody is the winner', () => {
          expect(winner).toStrictEqual('NOBODY');
        });
      });
    });
  });
});
