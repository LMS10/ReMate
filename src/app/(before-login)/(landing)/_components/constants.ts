import type {
  SidebarItem,
  WorkspaceCard,
  Step,
  StatItem,
  TableRow,
  InvitedWorkspace,
  ReceiptField,
} from './types';

export const SIDEBAR_ITEMS: SidebarItem[] = [
  { color: '#2563EB', label: '경영관리팀', hasCrown: true, active: true },
  { color: '#F59E0B', label: '맛집투어', hasCrown: true, active: false },
  { color: '#10B981', label: '아구직관모임', hasCrown: false, active: false },
  { color: '#8B5CF6', label: '학생회', hasCrown: false, active: false },
  { color: '#EC4899', label: '조기축구회', hasCrown: false, active: false },
];

export const WORKSPACE_CARDS: WorkspaceCard[] = [
  { color: '#2563EB', name: '경영관리팀', hasCrown: true },
  { color: '#F59E0B', name: '맛집투어', hasCrown: true },
  { color: '#10B981', name: '아구직관모임' },
  { color: '#8B5CF6', name: '학생회' },
  { color: '#EC4899', name: '조기축구회' },
];

export const STEPS: Step[] = [
  {
    num: '1',
    icon: 'building',
    title: '워크스페이스 생성',
    desc: '팀 이름과 색상을 선택해 워크스페이스를 만드세요.',
  },
  {
    num: '2',
    icon: 'mail',
    title: '팀원 초대',
    desc: '이메일로 팀원을 초대하고 멤버 권한을 부여하세요.',
  },
  {
    num: '3',
    icon: 'scan',
    title: 'AI 자동 스캔',
    desc: '영수증 사진을 찍어 올리면 OCR 인식과 동시에 AI가 이상 지출 패턴을 즉시 분석합니다.',
  },
  {
    num: '4',
    icon: 'checkCircle',
    title: '승인 & 정산',
    desc: '관리자가 AI 분석 결과를 참고해 승인·반려하면 끝. 영수증 목록은 다운로드도 가능해요.',
  },
];

export const HERO_STATS: StatItem[] = [
  { label: '총 영수증', val: '125 건', color: undefined },
  { label: '승인 대기', val: '10 건', color: '#A16207' },
  { label: '승인 완료', val: '112 건', color: '#15803D' },
  { label: '반려', val: '3 건', color: '#B91C1C' },
];

export const HERO_TABLE_ROWS: TableRow[] = [
  { name: '김민준', store: '스타벅스', amount: '₩34,800', badge: 'green', date: '2026-05-26' },
  { name: '정유진', store: '교보문고', amount: '₩46,300', badge: 'yellow', date: '2026-05-20' },
  { name: '이가은', store: '다이소', amount: '₩12,000', badge: 'yellow', date: '2026-05-12' },
  { name: '박현우', store: '코레일', amount: '₩104,800', badge: 'red', date: '2026-05-05' },
];

export const INVITED_WORKSPACES: InvitedWorkspace[] = [
  { name: '러닝 크루', inviter: '이승훈' },
  { name: '창업 동아리', inviter: '김현민' },
];

export const RECEIPT_FIELDS: ReceiptField[] = [
  { label: '게시자', val: '이지원', avatar: true },
  { label: '결제일', val: '2026-05-20 19:00', edit: true },
  { label: '가맹점', val: '스타벅스', edit: true },
  { label: '결제금액', val: '₩90,600', edit: true },
];

export const BADGE_LABEL: Record<'green' | 'yellow' | 'red', string> = {
  green: '승인',
  yellow: '대기',
  red: '반려',
};

export const APPROVAL_RECEIPT = {
  poster: '김민재',
  posterInitial: '김',
  posterColor: '#EEEEEE',
  date: '2026-05-16 02:45',
  aiResult: '유흥업소 의심',
  aiVariant: 'danger' as const, // 'ok' | 'warn' | 'danger'
  aiReason: '상호명 키워드 및 업종 분류 기준 유흥업소로 분류되었습니다.',
  store: '노래타운',
  status: '대기' as const,
  amount: '₩298,000',
};
